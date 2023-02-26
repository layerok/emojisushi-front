import React from "react";
import { ReactNode } from "react";

export const If = ({
  children,
  condition
                   }: {
  children?: ReactNode,
  condition: boolean
}) => {
  return <>
    {condition ? children: null}
  </>
}
