import type { Accessor, JSX } from "solid-js";
import { For } from "solid-js";

interface SwitcherOption<T> {
  value: T;
  label: string | JSX.Element;
}

interface SwitcherProps<T> {
  options: SwitcherOption<T>[];
  value: Accessor<T>;
  onChange(value: T): void;
  class?: string;
  optionClass?: string;
  activeClass?: string;
  inactiveClass?: string;
}

export default function Switcher<T>(props: SwitcherProps<T>): JSX.Element {
  return (
    <div
      class={`
        inline-flex
        divide-x divide-gray-300
        border border-gray-300
        rounded-md
        overflow-hidden
        ${props.class ?? ""}
      `}
      role="radiogroup"
    >
      <For each={props.options}>
        {(option) => {
          const isActive = () => option.value === props.value();

          return (
            // biome-ignore lint/a11y/useSemanticElements: using <input type="radio"> does not work here
            <button
              type="button"
              role="radio"
              aria-checked={isActive()}
              onClick={() => props.onChange(option.value)}
              class={`
                px-4 py-2
                text-sm font-medium
                whitespace-nowrap
                focus:outline-none
                ${
                  isActive()
                    ? (props.activeClass ?? "bg-gray-200 font-semibold")
                    : (props.inactiveClass ??
                      "bg-white text-gray-700 cursor-pointer")
                }
                ${props.optionClass ?? ""}
              `}
            >
              {option.label}
            </button>
          );
        }}
      </For>
    </div>
  );
}
