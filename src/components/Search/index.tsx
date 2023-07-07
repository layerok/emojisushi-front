import { useDebounce } from "src/common/hooks";
import { Form, useSearchParams, useSubmit } from "react-router-dom";
import { SearchInput } from "~components/SearchInput";

type TSearchProps = {
  loading?: boolean;
};

export const Search = ({ loading = false }: TSearchProps) => {
  // todo:  search value is not cleared after navigating to another category
  const submit = useSubmit();

  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  const debouncedFetch = useDebounce((form) => {
    const isFirstSearch = q == null;
    submit(form, {
      replace: !isFirstSearch,
    });
  }, 500);

  return (
    <Form role="search">
      {Array.from(searchParams.entries())
        .filter(([k]) => k !== "q")
        .map(([k, v], idx) => (
          <input type="hidden" name={k} defaultValue={v} key={idx} />
        ))}
      <SearchInput
        loading={loading}
        onChange={(event) => {
          // todo: add loading indicator when searching
          debouncedFetch(event.target.form);
        }}
        name="q"
        defaultValue={q}
      />
    </Form>
  );
};
