import { Input as BaseInput, type InputProps } from "@base-ui/react/input";
import styles from "./Input.module.css";

export function Input(props: InputProps) {
  return <BaseInput className={styles.input} {...props} />;
}
