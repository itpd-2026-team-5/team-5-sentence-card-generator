import { t } from "../i18n";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./Icon";

/** Model suggestions remain optional: any provider's model name can be typed. */
export function ModelPicker({
  id,
  value,
  options,
  placeholder,
  onChange,
}: {
  id: string;
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;
}) {
  const listId = useId();
  const container = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [active, setActive] = useState(-1);
  const suggestions = [...new Set(options)].filter(
    (model) => showAll || model.toLowerCase().includes(value.toLowerCase()),
  );

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  useEffect(() => {
    if (open && active >= 0)
      document
        .getElementById(`${listId}-${active}`)
        ?.scrollIntoView?.({ block: "nearest" });
  }, [active, open, listId]);

  const choose = (model: string) => {
    onChange(model);
    setOpen(false);
    setActive(-1);
    input.current?.focus();
  };

  return (
    <div
      className="model-picker"
      ref={container}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className="model-picker-control">
        <input
          id={id}
          ref={input}
          value={value}
          placeholder={placeholder}
          spellCheck={false}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={
            open && suggestions[active] !== undefined
              ? `${listId}-${active}`
              : undefined
          }
          onChange={(event) => {
            onChange(event.target.value);
            setShowAll(false);
            setOpen(true);
            setActive(-1);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              setOpen(false);
              setActive(-1);
            } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              setOpen(true);
              if (!open) setShowAll(true);
              if (suggestions.length)
                setActive((current) =>
                  event.key === "ArrowDown"
                    ? (current + 1) % suggestions.length
                    : (current <= 0 ? suggestions.length : current) - 1,
                );
            } else if (
              event.key === "Enter" &&
              open &&
              suggestions[active] !== undefined
            ) {
              event.preventDefault();
              choose(suggestions[active]);
            } else if (event.key === "Tab") setOpen(false);
          }}
        />
        <button
          type="button"
          className="model-picker-toggle"
          aria-label={t("Show model suggestions")}
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => {
            setOpen(!open);
            setShowAll(true);
            setActive(-1);
            input.current?.focus();
          }}
        >
          <Icon name={open ? "up" : "down"} size={16} />
        </button>
      </div>
      {open && (
        <div className="model-picker-popup">
          <ul id={listId} role="listbox" aria-label={t("Models")}>
            {suggestions.map((model, index) => (
              <li
                id={`${listId}-${index}`}
                key={model}
                role="option"
                aria-selected={value === model}
                className={index === active ? "is-focused" : ""}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => choose(model)}
              >
                <span>{model}</span>
                {value === model && <Icon name="check" size={16} />}
              </li>
            ))}
          </ul>
          {suggestions.length === 0 && (
            <p className="muted small">
              {t("No matching models. You can type a model name.")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
