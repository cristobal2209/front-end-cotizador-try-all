import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Spinner,
} from "@material-tailwind/react";
import {
  doc,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

function ShowOtherPrices({ supplierCollection }) {
  return (
    <div className="flex w-full max-w-5xl flex-col justify-between">
      <div className="flex flex-row items-center justify-between px-2">
        <span className="w-1/5 font-bold">Proveedor</span>
        <span className="w-1/5 font-bold">Precio</span>
        <span className="w-1/5 font-bold">País de procedencia</span>
        <span className="w-2/5"></span>
      </div>
      {supplierCollection.map((articleSupplier) => (
        <div
          className="mt-6 w-full rounded-md bg-secondary px-2 py-2"
          key={articleSupplier.id}
        >
          <div className="flex flex-row items-center justify-between px-2">
            <span className="w-1/4">{articleSupplier.id}</span>
            <span className="w-1/4">
              ${Number(articleSupplier.price).toLocaleString()}
            </span>
            <span className="w-1/4">{articleSupplier.country}</span>
            <span className="w-1/4">
              <a
                href={articleSupplier.link}
                className="text-gray-300 hover:text-blue-500"
              >
                Ir a página
              </a>
            </span>
            <Button className=" bg-quaternary">Agregar a cotizacion</Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ShowOtherImgs({ articleImgs }) {
  return (
    <div className="flex w-full flex-row px-8">
      {articleImgs.map((articleImg) => (
        <div className="" key={articleImg.id}>
          <img
            src={articleImg.imgUrl}
            alt=""
            className="h-28 max-w-[180px] object-contain px-5"
          />
        </div>
      ))}
    </div>
  );
}

const initialValues = {
  brand: "",
  category: "",
  details: "",
  articleName: "",
  imgUrl: "",
};

export default function Article() {
  const [isLoading, setIsLoading] = useState(true);
  const [articleData, setArticleData] = useState(initialValues);
  const [supplierCollection, setSupplierCollection] = useState([]);
  const { articleId } = useParams();

  useEffect(() => {
    getArticleData();
    getSuppliersCollection();
  }, []);

  const getArticleData = async () => {
    setIsLoading(true);
    const newArticleData = await getDoc(doc(db, "prueba-articulos", articleId));
    setArticleData(newArticleData.data());
    setIsLoading(false);
  };

  const getSuppliersCollection = async () => {
    //recupera desde la coleccion "prueba-articulos, y segun el articulo, recupera su coleccion de proveedores"
    const querySnapshot = await getDocs(
      collection(db, "prueba-articulos", articleId, "suppliers")
    );

    const supplierCollection = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSupplierCollection(supplierCollection);
  };

  return (
    <div className="mx-auto grid h-full max-w-7xl grid-cols-4 pt-20">
      {isLoading ? (
        <Spinner className="mx-auto mt-20 h-12 w-12" />
      ) : (
        <section className="col-span-4 flex flex-col  lg:col-span-3">
          {/* inicio imagen y detalles*/}
          <div className="flex flex-row justify-start ">
            {/* imagen principal articulo */}
            <div className="flex w-1/2 flex-row justify-start">
              <div>
                <img
                  className="mx-auto w-full object-contain px-10 lg:max-w-[450px] xl:max-w-[520px]"
                  src={articleData.imgUrl}
                  alt="nature image"
                />
              </div>
            </div>
            {/* detalles articulos */}
            <div className="flex w-1/2 flex-col px-2">
              <h1 className="mb-3 text-2xl font-bold">
                {articleData.articleName}
              </h1>
              <div className="flex flex-col pl-5">
                <div className="pb-3 text-xl font-bold">
                  Detalles del articulo
                  <div className="text-base font-normal">
                    <p>Categoria: {articleData.category}</p>
                    <p>Marca: {articleData.brand}</p>
                  </div>
                </div>
                <div className="pb-3 text-xl font-bold">
                  Descripcion del articulo
                  <p className="text-base font-normal	">{articleData.details}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="  px-2 py-5">
            {/* <ShowOtherImgs articleImgs={articleImgs} /> */}
          </div>
          {/* llamada a ofertas de otras empresas*/}
          <div className="mx-10 rounded-md bg-primary p-5  shadow-md">
            <h1 className="py-5 text-xl font-bold">Lista proveedores</h1>
            <ShowOtherPrices supplierCollection={supplierCollection} />
          </div>
        </section>
      )}

      {/* mejor oferta escritorio */}
      {!isLoading && (
        <aside className="flex-start col-span-1 px-10">
          <Card className="bg-secondary">
            <CardBody>
              <h1 className="text-lg font-bold text-white">
                Aquí irá la mejor oferta.
              </h1>
            </CardBody>
            <CardFooter>
              <div>
                <Button className="bg-quaternary">Añadir a cotización</Button>
              </div>
            </CardFooter>
          </Card>
        </aside>
      )}
    </div>
  );
}
