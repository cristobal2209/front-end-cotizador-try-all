import React from "react";
import {
  Collapse,
  Typography,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  FlagIcon,
  ChatBubbleOvalLeftIcon,
  UsersIcon,
  FolderIcon,
  RocketLaunchIcon,
  FaceSmileIcon,
  PuzzlePieceIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";

const CategoryMenuItems = [
  {
    icon: FlagIcon,
    title: "About us",
  },
  {
    icon: ChatBubbleOvalLeftIcon,
    title: "Press",
  },
  {
    icon: UsersIcon,
    title: "Carreers",
  },
  {
    icon: FolderIcon,
    title: "Legal",
  },
  {
    icon: RocketLaunchIcon,
    title: "Products",
  },
  {
    icon: FaceSmileIcon,
    title: "Icons",
  },
  {
    icon: PuzzlePieceIcon,
    title: "UI Kits",
  },
  {
    icon: GiftIcon,
    title: "Open Source",
  },
];

export default function CategoryList() {
  const [isCategoriesOpen, setIsCategoriesOpen] = React.useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] =
    React.useState(false);

  //funcion que muestra categorias en menu desplegable
  const renderItems = CategoryMenuItems.map(({ title }, key) => (
    <a href="#" key={key}>
      <MenuItem className="flex items-center gap-3 rounded-lg">
        {/* icono categoria */}
        <div className={`rounded-lg bg-white p-5`}></div>
        {/* titulo categoria */}
        <div>
          <Typography variant="h6" color="white" className="text-center">
            {title}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ));
  return (
    <List className="mb-6 mt-4 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:justify-center">
      <Menu
        open={isCategoriesOpen}
        handler={setIsCategoriesOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler className="">
          <Typography as="div" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 text-white"
              selected={isCategoriesOpen || isMobileCategoriesOpen}
              onClick={() => setIsMobileCategoriesOpen((cur) => !cur)}
            >
              Categorias
              {/* icono de flecha */}
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform ${
                  isCategoriesOpen || isMobileCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        {/* renderizando categorias en escritorio */}
        <MenuList
          className="hidden w-full border-primary bg-primary shadow-sm lg:block "
          blurred={false}
        >
          <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
        </MenuList>
        
      </Menu>
      {/* renderizando categorias en mobile */}
      <div className="block lg:hidden">
        <Collapse open={isMobileCategoriesOpen}>{renderItems}</Collapse>
      </div>
    </List>
  );
}
