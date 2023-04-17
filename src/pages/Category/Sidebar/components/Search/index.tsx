import * as S from "./styled";
import { useIsTablet } from "~common/hooks/useBreakpoint";
import { useDebounce } from "~common/hooks/useDebounce";
import Skeleton from "react-loading-skeleton";
import { Form, useLoaderData, useSubmit } from "react-router-dom";

export const Search = ({ loading = false }: { loading?: boolean }) => {
  const isTablet = useIsTablet();
  const submit = useSubmit();
  const { q } = useLoaderData() as {
    q: string | undefined;
  };

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
