type productCardProps = {
  image: string | undefined;
  name: string | undefined;
  price: number | undefined;
  discountPrice?: number;
  desc?: string;
  _id?: string | undefined;
  imageFormat?: string | undefined;
};
interface TransactionProps {
  _id?: string | undefined;
  clientName: string | undefined;
  status: string | undefined;
  priority: string | undefined;
  deadline: string | undefined;
}
interface TransactionListProps {
  item: {
    products: Product[];
    clientName: string;
    email: string;
    phone: string;
    phoneTwo: string;
    desc: string;
    priority: string;
    deadline: string;
    status: string;
    _id?: string | undefined;
  }
}

interface ProductCartCardProp {
  item: {
    image: string | undefined;
    name: string | undefined;
    price: number | undefined;
    discountPrice?: number;
    desc?: string;
    _id?: string | undefined;
    imageFormat?: string | undefined;
  };
  index: number;
}

type Product = {
  image: string | undefined;
  name: string | undefined;
  price: number | undefined;
  discountPrice?: number;
  desc?: string;
  _id?: string | undefined;
  imageFormat?: string | undefined;
  uniqueIdentifier?: String;
};
type ProductWithCount = {
  image: string | undefined;
  name: string | undefined;
  price: number | bigint;
  discountPrice?: number;
  desc?: string;
  _id?: string | undefined;
  imageFormat?: string | undefined;
  itemCount: number;
  uniqueIdentifier?: String;
};
type TransDetailProd = {
  image: string | undefined;
  name: string | undefined;
  price: number | undefined;
  discountPrice?: number;
  desc?: string;
  _id?: string | undefined;
  itemCount: number;
  imageFormat?: string | undefined;
  uniqueIdentifier?: String;
};

type Transaction = {
  products: Product[];
  clientName: string;
  email: string;
  phone: string;
  phoneTwo: string;
  desc: string;
  priority: string;
  deadline: string;
  status: string;
  _id?: string | undefined;
  uniqueIdentifier?: String;
}

type SetUserPayload =
  | ({
      // eslint-disable-line prettier/prettier
      name?: string; // eslint-disable-line prettier/prettier
      photo?: string; // eslint-disable-line prettier/prettier
      // Add any more properties you are sure of here
    } & Record<string, any>)
  | undefined; // eslint-disable-line prettier/prettier

type CountryFilterType = string | null;
type FeaturedPayload = Array<Product>;
type TransProductPayload = Array<{
  image: string | undefined;
  name: string | undefined;
  price: number | undefined;
  discountPrice?: number;
  desc?: string;
  _id?: string | undefined;
  imageFormat?: string | undefined;
  itemCount: number;
}>;
