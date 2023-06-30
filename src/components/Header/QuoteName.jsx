import { useState } from "react";

import { Button, Input } from "@material-tailwind/react";

import { CheckIcon } from "@heroicons/react/24/outline";

export default function QuoteName() {
  const [quoteName, setQuoteName] = useState("NuevaCotización");
  const [isEditing, setIsEditing] = useState(false);

  const handleNameChange = (e) => {
    setQuoteName(e.target.value);
    setIsEditing(true);
  };

  const handleSaveName = () => {
    // Aquí puedes realizar las acciones necesarias para guardar el nuevo nombre de cotización
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex min-w-[280px] items-center justify-end">
        {isEditing ? (
          <Input
            type="search"
            label="Nuevo nombre"
            className=" bg-secondary text-white"
            color="white"
            value={quoteName}
            onChange={handleNameChange}
          />
        ) : (
          <div className="">
            <span className=" mx-2 text-white">Cotizacion actual: </span>
            <span className=" mx-2 text-white">{quoteName}</span>
          </div>
        )}
        <div className="px-2">
          {isEditing ? (
            <Button
              size="sm"
              className=" rounded bg-quaternary shadow-none hover:bg-quaternaryHover hover:shadow-none"
              onClick={handleSaveName}
            >
              <CheckIcon className="h-full w-3" />
            </Button>
          ) : (
            <Button
              size="sm"
              className=" rounded bg-quaternary shadow-none hover:bg-quaternaryHover hover:shadow-none"
              onClick={() => setIsEditing(true)}
            >
              Cambiar nombre
              {/* <PencilIcon className="h-full w-3" /> */}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
