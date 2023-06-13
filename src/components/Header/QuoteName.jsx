import { useState } from "react";

import { Button } from "@material-tailwind/react";

import { CheckIcon, PencilIcon } from "@heroicons/react/24/outline";

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
      <div className="flex items-center">
        {isEditing ? (
          <input
            type="text"
            className="rounded-md bg-secondary px-2 text-white"
            value={quoteName}
            onChange={handleNameChange}
          />
        ) : (
          <span className="ml-4 text-white">{quoteName}</span>
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
              <PencilIcon className="h-full w-3" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
