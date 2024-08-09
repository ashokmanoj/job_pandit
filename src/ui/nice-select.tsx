"use client";
import React, { useState, useCallback, useRef } from "react";
import { useClickAway } from "react-use";

type Option = {
  value: string;
  label: string;
};

type IPropType = {
  options: Option[];
  defaultCurrent: number;
  placeholder?: string;
  cls?: string | undefined;
  value?: string;
  onChange: (item: Option) => void;
  name: string;
};

const NiceSelect: React.FC<IPropType> = ({
  options,
  defaultCurrent,
  placeholder,
  cls,
  onChange,
  value,
  name,
}) => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Option>(options[defaultCurrent]);
  const [search, setSearch] = useState("");
  const onClose = useCallback(() => {
    setOpen(false);
    setSearch(""); // Clear search when closing
  }, []);
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, onClose);

  const currentHandler = (item: Option) => {
    setCurrent(item);
    onChange(item);
    onClose();
  };

  const filteredOptions = options.filter(option =>
    (option.label?.toString() || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`nice-select ${cls ? cls : ''} ${open ? "open" : ""}`}
      role="button"
      tabIndex={0}
      onClick={() => setOpen(true)}
      ref={ref}
    >
      {open && (
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder='Search...'
          style={{ border: 'none', outline: 'none', height: '90%', zIndex: 100 }}
        />
      )}
      {!open && (
        <span className="current">
          {value ? value : current ? current.label : placeholder}
        </span>
      )}
      {open && (
        <>
          <ul
            className="list"
            role="menubar"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredOptions.map((item, i) => (
              <li
                key={i}
                data-value={item.value}
                className={`option ${item.value === current.value ? "selected focus" : ""}`}
                role="menuitem"
                onClick={() => currentHandler(item)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default NiceSelect;
