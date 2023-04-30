import * as S from "./styled";
import { useIsTablet, useDebounce } from "src/common/hooks";
import Skeleton from "react-loading-skeleton";
import {
  Form,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "react-router-dom";

type TSearchProps = {
  loading?: boolean;
};

export const Search = ({ loading = false }: TSearchProps) => {
  const isTablet = useIsTablet();
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

  if (loading) {
    return (
      <S.SearchContainer
        style={{
          flexGrow: 1,
          width: "100%",
        }}
      >
        <Skeleton
          borderRadius={10}
          width={isTablet ? 255 : "100%"}
          height={40}
        />
      </S.SearchContainer>
    );
  }

  return (
    <S.SearchContainer>
      <Form role="search">
        {/* todo: preserve all search params, not only 'sort' param */}
        {searchParams.has("sort") && (
          <input type="hidden" name="sort" value={searchParams.get("sort")} />
        )}
        <S.SearchInput
          onChange={(event) => {
            // todo: add loading indicator when searching
            debouncedFetch(event.target.form);
          }}
          type="search"
          name="q"
          defaultValue={q}
        />
      </Form>
    </S.SearchContainer>
  );
};
