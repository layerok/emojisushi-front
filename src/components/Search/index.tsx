import { useDebounce } from "src/common/hooks";
import {
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import { SearchInput } from "~components/SearchInput";

type TSearchProps = {
  loading?: boolean;
};

export const Search = ({ loading = false }: TSearchProps) => {
  const submit = useSubmit();
  const { q } = useLoaderData() as {
    q: string | undefined;
  };
  const [searchParams] = useSearchParams();

  const debouncedFetch = useDebounce((form) => {
    const isFirstSearch = q == null;
    submit(form, {
      replace: !isFirstSearch,
    });
  }, 500);

  return (
    <Form role="search">
      {/* todo: preserve all search params, not only 'sort' param */}
      {searchParams.has("sort") && (
        <input type="hidden" name="sort" value={searchParams.get("sort")} />
      )}
      <SearchInput
        loading={loading}
        onChange={(event) => {
          // todo: add loading indicator when searching
          debouncedFetch(event.target.form);
        }}
        type="search"
        name="q"
        defaultValue={q}
      />
    </Form>
  );
};
