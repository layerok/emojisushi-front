import * as S from "./styled";
import Skeleton from "react-loading-skeleton";
import { clamp } from "src/utils/utils";
import { ReactNode } from "react";

type TChip = {
  label: string;
  key: string;
};

type TChipCloudProps = {
  items?: TChip[];
  loading?: boolean;
  children?: ReactNode;
};

type TCategoryProps = {
  loading?: boolean;
  item?: TChip;
  children?: ReactNode;
  isActive?: boolean;
};

const ChipCloud = ({ children }: TChipCloudProps) => {
  return (
    <S.Chips>
      <S.Container>{children}</S.Container>
    </S.Chips>
  );
};

export const Chip = ({
  loading = false,
  children,
  isActive = false,
}: TCategoryProps) => {
  if (loading) {
    const randomWidth = Math.floor(Math.random() * 250);
    return (
      <S.ChipContainer>
        <Skeleton
          borderRadius={5}
          height={40}
          width={clamp(randomWidth, 80, 250)}
        />
      </S.ChipContainer>
    );
  }

  return (
    <S.ChipContainer>
      <S.Chip isActive={isActive}>{children}</S.Chip>
    </S.ChipContainer>
  );
};

export { ChipCloud };
