import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { accessToken, baseURL, colors, fonts } from 'renderer/components/styled';
import styles from './styles.module.css';
import { ColorRing } from 'react-loader-spinner';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { Link, useLocation } from 'react-router-dom';
import { useImageFormat } from 'renderer/hooks/useImageFormat';

const EditProduct: React.FC = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [productName, setProductName] = useState<string>(product.name);
  const [discountPrice, setDiscountPrice] = useState<string>(product.discountPrice);
  const [originalPrice, setOriginalPrice] = useState<string>(product.price);
  const [productDesc, setProductDesc] = useState<string>(product.desc);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State to hold the image preview URL
  const [imageDefault, setImageDefault] = useState<string | null>(product.image); // State to hold the image preview URL
  const [error, setError] = useState<null | any>(null);
  const [data, setData] = useState<null | any>(null);
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const userId = localStorage.getItem('userId');
  const parsedUserId = userId && JSON.parse(userId);

  const editImageFormat = useImageFormat(product.imageFormat);

  const getBase64ImageFormat = (dataURI: string | undefined) => {
    const formatMatcher = dataURI?.match(/^data:(image\/\w+);base64,/);
    return formatMatcher ? formatMatcher[1] : 'jpeg'; // Use 'jpeg' as the default image format
  };


  const handleImageChange: any = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    if (selectedImage) {
      // Convert the image file to a Base64 string before sending it to the backend
      const reader = new FileReader();
      reader.onloadend = async() => {
        const imageDataString = reader.result?.toString().split(','); // Extract the Base64 string without data:image/...;base64,
        const imageType = imageDataString?.[0];
        console.log("Image Type: ", imageType);
        const imageFormat = getBase64ImageFormat(imageType?.[0]);
        console.log("Image Format: ", imageFormat);
        // Now you can send this `imageDataString` to the backend along with other form data.
        const productData = {
          image: imageDataString?.[1],
          name: productName,
          discountPrice: discountPrice,
          price: originalPrice,
          desc: productDesc,
          imageFormat
        };
        console.log(productData)

        if(productData.desc !== null && productData.name !== null && productData.discountPrice !== null) {
          try {
            const response = await fetch(`${baseURL}${`/api/v1/products/${product._id}?userId=${parsedUserId}`}`, {
                method: "PUT",
                headers: {
                  Authorization: `Token ${accessToken}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(productData)
              });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
            setError(null);
            setShowStatus(true);
            setLoading(false);
            window.location.reload();
          } catch (error: any) {
            setError(error.message);
            setData(null);
            setShowStatus(true);
            setLoading(false);
          }
        } else {
          alert("All fields are required!!");
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  useEffect(() => {
    const delayedComponent = setTimeout(() => {
      setShowStatus(false);
    }, 3000);

    return () => clearTimeout(delayedComponent);
  }, [showStatus]);

  return (
    <div
      className={`py-[48px] px-[49px] w-[93.8vw] h-[100vh] ${styles.dashboard}`}
    >
      <Link to={"/products"}
        className=""
        style={{
          fontFamily: fonts.family.medium,
          fontSize: 24,
        }}
      >
        <span>&larr;</span>
        New Product
      </Link>
      <form onSubmit={handleSubmit} className="w-full mt-[30px]">
        <div className="w-full h-full">
          <label
            htmlFor="file"
            className="border-[3px] border-dashed bg-slate-200 rounded-md w-full h-[300px] flex justify-center items-center text-4xl"
            style={{
              color: colors.primary,
              borderColor: colors.primary,
            }}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Selected Image Preview"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                className=''
              />
            ) : imageDefault ? (
              <img
                src={`${editImageFormat}${product.image}`}
                width={130}
                className="w-[15rem] object-cover"
                alt=""
              />
            ) : (
              'Select File'
            )}
          </label>
          <input
            onChange={handleImageChange}
            className="invisible"
            accept="image/*"
            type="file"
            id="file"
            name="file"
            required
          />
        </div>
        <div className="flex flex-grow-0">
          <div className="w-1/2">
            <input
              className="px-3 py-2 border-[2px] border-solid border-[#b8b8b8] text-[#676767] rounded-md w-full"
              type="text"
              placeholder="Enter product name"
              name="name"
              value={productName}
              id="name"
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="w-1/2 flex flex-grow-0">
            <input
              type="number"
              placeholder="Discount Price"
              className="px-3 py-2 border-[2px] border-solid border-[#b8b8b8] text-[#676767] rounded-md w-1/2 ml-4"
              onChange={(e) => setDiscountPrice(e.target.value)}
              required
              value={discountPrice}
            />
            <input
              type="number"
              placeholder="Original Price"
              className="px-3 py-2 border-[2px] border-solid border-[#b8b8b8] text-[#676767] rounded-md w-1/2 ml-4"
              onChange={(e) => setOriginalPrice(e.target.value)}
              required
              value={originalPrice}
            />
          </div>
        </div>

        <div>
          <textarea
            className="px-3 py-2 border-[2px] border-solid border-[#b8b8b8] text-[#676767] rounded-md w-full mt-7"
            name="description"
            id="description"
            cols={30}
            rows={5}
            placeholder="Enter Product Description"
            required
            onChange={(e) => setProductDesc(e.target.value)}
            value={productDesc}
          ></textarea>
        </div>

        <button
          type="submit"
          className="
              h-10 px-3
              rounded-[8px]
              text-white flex
              items-center
              border-[1px]
              hover:border-solid
              hover:border-[#3855B3]
              hover:bg-white
              hover:text-[#3855B3]
              bg-[#3855B3]
              transition-all
              duration-500
             justify-center
              ease-in-out
              w-full
              mt-11
            "
          style={{ padding: 30, fontFamily: fonts.family.medium, fontSize: 20 }}
        >
          {loading ? (
            <ColorRing
              visible={true}
              height="50"
              width="50"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#ECD348', '#ECD348', '#ECD348', '#ECD348', '#ECD348']}
            />
          ) : "Update Product"}
        </button>
      </form>
      {showStatus && (
        <div className='flex justify-center items-center w-full'>
          <div className={`absolute bottom-5 rounded-md p-2 font-semibold ${data && "bg-green-300"} ${error && "bg-orange-300"}`}>
              {error && <p className='text-black' style={{ fontFamily: fonts.family.medium}}>{error.message}</p>}
              {data?.status === 201 && <p className='text-black' style={{ fontFamily: fonts.family.medium}}>{data.detail}</p>}
              {console.log("data inside jsx", data)}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
