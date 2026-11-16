import { Button as BaseButton, type ButtonProps } from "@base-ui/react/button";
import cn from "classnames";
import styles from "./Button.module.css";

export function Button(props: ButtonProps) {
  return (
    <BaseButton
      {...props}
      type={props.type ?? "button"}
      className={cn(styles.button, props.className)}
    />
  );
}
