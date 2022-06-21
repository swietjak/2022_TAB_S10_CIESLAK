import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useState, useEffect, Fragment, useCallback, ChangeEvent } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Entity, FieldValue } from "shared/types";

interface FormAutocompleteProps {
  getOptions: () => Promise<Entity[]>;
  name: string;
  label: string;
}

export const createGetAutocompleteOptions =
  <T extends Entity>(fetchData: (query?: string) => Promise<T[]>) =>
  (query?: string) =>
    fetchData(query).then((values) =>
      values.map((value) => ({
        label: value.name,
        value: value.id,
      }))
    );

const FormAutocomplete = ({
  getOptions,
  name,
  label,
}: FormAutocompleteProps) => {
  const fetchOptions = createGetAutocompleteOptions(getOptions);
  const { control } = useFormContext();
  const {
    field: { value, onChange },
    fieldState: { error },
    //@ts-ignore
  } = useController({ control, name });

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly FieldValue[]>([]);
  const loading = open && options.length === 0;

  const handleChange = useCallback(
    (e: ChangeEvent<{}>, val: any) => onChange(val),
    [onChange]
  );

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const options = await fetchOptions(); // For demo purposes.

      if (active) {
        setOptions([...options]);
      }
    })();

    return () => {
      active = false;
    };
  }, [fetchOptions, loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      sx={{ width: 500 }}
      value={value}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, fieldValue) =>
        option.value === fieldValue.value
      }
      getOptionLabel={(option) => option.label}
      options={options}
      loading={loading}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          helperText={error?.message}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default FormAutocomplete;
