import React, {
  useEffect,
  useState,
  useRef,
} from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FaArrowLeft,
  FaCamera,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffectEvent } from "react";

const EditCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  useEffect(()=>{
    console.log("the course id",data);
  })
  const fileInputRef = useRef();
   
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    categorie: "",
    level: "",
    price: "",
    thumnail: null,
    isPublised: false,
  });

  const [preview, setPreview] =
    useState("");

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title || "",
        subtitle: data.subtitle || "",
        description:
          data.description || "",
        categorie:
          data.categorie || "",
        level: data.level || "",
        price: data.price || "",
        thumnail: null,
        isPublised:
          data.isPublised || false,
      });

      setPreview(data.thumnail || "");
    }
  }, [data]);

  const handleThumbnailClick = () => {
    fileInputRef.current.click();
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setForm({
        ...form,
        thumnail: file,
      });

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  const handleRemoveThumbnail = () => {
    setForm({
      ...form,
      thumnail: null,
    });
    setPreview("");
  };


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData =
        new FormData();

      formData.append(
        "title",
        form.title
      );
      formData.append(
        "subtitle",
        form.subtitle
      );
      formData.append(
        "description",
        form.description
      );
      formData.append(
        "categorie",
        form.categorie
      );
      formData.append(
        "level",
        form.level
      );
      formData.append(
        "price",
        form.price
      );
      formData.append(
        "isPublised",
        form.isPublised
      );

      if (form.thumnail) {
        formData.append(
          "thumnail",
          form.thumnail
        );
      }

      const res =
        await axios.post(
          ` https://lms-system-1-183s.onrender.com/api/course/editCourse/${data}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      if (res.status === 200) {
        toast.success(
          "Course updated successfully"
        );
        navigate(-1);
      }
    } catch (error) {
      toast.error(
        "Update failed"
      );
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 p-5 bg-white shadow">
        <div className="flex gap-4 items-center">
          <FaArrowLeft
            className="w-5 h-5 cursor-pointer"
            onClick={() =>
              navigate(-1)
            }
          />
          <h1 className="text-xl md:text-3xl font-bold">
            Edit Course Information
          </h1>
        </div>

        <button
          onClick={() =>
            navigate("/createl",{
              state:data
            })
          }
          className="w-full md:w-44 h-10 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          Go to Lecture Page
        </button>
      </div>
      <form
        onSubmit={handleUpdate}
        className="flex-1 p-4 md:p-8 flex flex-col justify-between"
      >
        <div className="w-full lg:w-[60%] mx-auto">
          
          <h1 className="font-bold text-lg">
            Basic Course Information
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  isPublised: true,
                })
              }
              className="w-full sm:w-44 h-10 bg-green-200 border-2 border-green-400 text-green-700 rounded"
            >
              Publish Course
            </button>

            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  isPublised: false,
                })
              }
              className="w-full sm:w-44 h-10 bg-red-200 border-2 border-red-400 text-red-600 rounded"
            >
              Unpublish
            </button>
          </div>
          <div className="flex flex-col mt-6 gap-3">
            
            <label>Title</label>
            <input
              className="border h-10 px-2 rounded"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
            />

            <label>Subtitle</label>
            <input
              className="border h-10 px-2 rounded"
              value={form.subtitle}
              onChange={(e) =>
                setForm({
                  ...form,
                  subtitle:
                    e.target.value,
                })
              }
            />

            <label>Description</label>
            <textarea
              className="border h-24 px-2 py-1 rounded"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <select
                value={form.categorie}
                onChange={(e) =>
                  setForm({
                    ...form,
                    categorie:
                      e.target.value,
                  })
                }
                className="h-10 border rounded px-2 bg-white"
              >
                <option value="">
                  Category
                </option>
                <option value="Web Development">
                  Web Development
                </option>
                <option value="App Development">
                  App Development
                </option>
                <option value="AI / ML">
                  AI / ML
                </option>
                <option value="Cyber Security">
                  Cyber Security
                </option>
              </select>

              <select
                value={form.level}
                onChange={(e) =>
                  setForm({
                    ...form,
                    level:
                      e.target.value,
                  })
                }
                className="h-10 border rounded px-2 bg-white"
              >
                <option value="">
                  Level
                </option>
                <option value="beginner">
                  Beginner
                </option>
                <option value="Intermediate">
                  Intermediate
                </option>
                <option value="Advanced">
                  Advanced
                </option>
              </select>

              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price:
                      e.target.value,
                  })
                }
                className="h-10 border rounded px-2"
              />
            </div>
          </div>
          <div className="mt-10">
            <h2 className="font-bold text-lg mb-3">
              Course Thumbnail
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              
              <div
                onClick={
                  handleThumbnailClick
                }
                className="w-full sm:w-60 h-40 border-2 rounded overflow-hidden bg-gray-100 flex items-center justify-center cursor-pointer"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <FaCamera className="text-2xl mb-2" />
                    <p className="text-sm">
                      Click to Upload
                    </p>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={
                  handleThumbnailChange
                }
                className="hidden"
              />

              <button
                type="button"
                onClick={
                  handleRemoveThumbnail
                }
                className="w-full sm:w-40 h-10 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-10 w-full lg:w-[60%] mx-auto">
          
          <button
            type="submit"
            className="w-full sm:w-40 h-10 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="w-full sm:w-40 h-10 bg-gray-300 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
