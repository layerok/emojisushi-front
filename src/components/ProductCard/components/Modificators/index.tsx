import { Switcher } from "~components";
import { Product } from "~models";

type TModificatorsProps = {
  product?: Product;
  modificators: any;
  setModificators: any;
  loading?: boolean;
};

export const Modificators = ({
  product,
  modificators,
  setModificators,
  loading = false,
}: TModificatorsProps) => {
  if (loading) {
    return null;
  }

  return (
    <>
      {(product?.modGroups || []).map((group) => (
        <Switcher
          key={group.id}
          style={{ marginTop: "12px" }}
          onChange={({ option }) => {
            setModificators((state) => {
              return {
                ...state,
                [group.property.id]: option.value,
              };
            });
          }}
          name={"modificator_" + group.property.id}
          options={group.property.options.map((option) => ({
            value: +option.poster_id,
            label: option.value,
          }))}
          value={+modificators[group.property.id]}
        />
      ))}
    </>
  );
};
