import { useState } from "react";
import {
  Button,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import * as xlsx from 'xlsx';
function imprimir(quote){
 const  ElementosCotizacion={
  articles: ['A', 'B' ],
  date: "Wed Oct 25 2023",
  id: "ABE1O4GTC2jCp0E1mdSY",
  quoteName: "Cotizacion Brandon",
  responsibleName: "admin  uno",
  responsibleUUID: "0VOroWOgCjZkt1X5mrAvNrQCLsp2",
  state: 2, version: "1.0",
 }

  
  ElementosCotizacion.articles.forEach(element => {
    console.log(quote);
  });
}

function generarPlanillaExcel(quote) {
  //hace la matriz de excel campo por campo
  let ElementosCotizacion = [
    ["NombreCotizacion"],
    ["", quote.quoteName],
    ["Productos"],
  ];
  console.log(quote.products);
  //pone los articulos
  ElementosCotizacion.push(["", "Producto","NumeroParte", "Cantidad", "Precio"]);

  for (const product of quote.products){
  ElementosCotizacion.push(["",product.description,product.manufacturerPartNo,product.quantity,product.price]);
  }
  

  ElementosCotizacion.push(["Otras filas"]);
  ElementosCotizacion.push([""]);
  ElementosCotizacion.push(["Total"]);

  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.aoa_to_sheet(ElementosCotizacion);

  xlsx.utils.book_append_sheet(workbook, worksheet, "Cotización");

  const nombrecotizacion = quote.quoteName + ".xlsx";
  xlsx.writeFile(workbook, nombrecotizacion);
  //console.log(ElementosCotizacion);
}
export default function UserQuoteRow({
  quote,
  classes,
  handleSuccessAlert,
  handleFailedAlert,
}) {
  const [openThreeDotsOptions, setOpenThreeDotsOptions] = useState(false);

  const handleOpenThreeDotsOptions = () => {
    setOpenThreeDotsOptions(!openThreeDotsOptions);
  };

  return (
    <>
      <tr className="hover:bg-gray-200">
        <td className={classes}>
          <Typography variant="small" color="blue-gray" className="font-normal">
            {quote.quoteName}
          </Typography>
        </td>
        {/* <td className={classes}>
          <Typography variant="small" color="blue-gray" className="font-normal">
            {quote.version}
          </Typography>
        </td> */}
        <td className={classes}>
          <Typography variant="small" color="blue-gray" className="font-normal">
            {quote.state == 1
              ? "Activa"
              : quote.state == 2
              ? "En curso"
              : quote.state == 3
              ? "Finalizada"
              : "Existe"}
          </Typography>
        </td>
        <td className={classes}>
          <Typography variant="small" color="blue-gray" className="font-normal">
            {quote.date}
          </Typography>
        </td>
        <td className={classes}>
          <Button variant="text" className="px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </Button>
        </td>
        <td className={classes}>
          <Menu>
            <MenuHandler>
              <Button
                variant="text"
                className="px-3"
                onClick={handleOpenThreeDotsOptions}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem>Cambiar nombre</MenuItem>
              <MenuItem onClick={() => imprimir(quote)}>Ver Versiones</MenuItem>
              <MenuItem onClick={() => generarPlanillaExcel(quote)}>Descargar Excel</MenuItem>
              <MenuItem>Eliminar</MenuItem>
            </MenuList>
          </Menu>
        </td>
      </tr>
    </>
  );
}
