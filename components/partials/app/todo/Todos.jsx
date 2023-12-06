import React from "react";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, editTodo, isCheck, isFaveCheck, fetchTodo } from "./store";

const Tasks = ({ todo }) => {
  const { id, title, is_done, category, is_fav, is_trash } = todo;
  const { editModal } = useSelector((state) => state.todo);
  const { token, token_type } = useSelector((state) => state.auth);
  const [checked, setChecked] = React.useState(is_done);
  const [fav, setFav] = React.useState(is_fav);
  const handleCheck = (id) => {
    return async (event) => {
      setChecked(event.target.checked);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token_type}${token}`,
            },
            body: JSON.stringify({ is_done: event.target.checked }),
          }
        );

        const data = await response.json();

        if (data.meta.status === "success") {
          dispatch(isCheck(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  const handleFav = (id) => {
    return async (event) => {
      setFav(event.target.checked);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token_type}${token}`,
            },
            body: JSON.stringify({ is_fav: event.target.checked }),
          }
        );

        const data = await response.json();

        if (data.meta.status === "success") {
          dispatch(isFaveCheck(id));
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token_type}${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.meta.status === "success") {
        dispatch(deleteTodo(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();
  return (
    <>
      <li className="flex items-center px-6 space-x-4 py-6 hover:-translate-y-1 hover:shadow-todo transition-all duration-200 rtl:space-x-reverse">
        <div>
          <Checkbox value={checked} onChange={handleCheck(id)} />
        </div>

        <label>
          <input
            type="checkbox"
            className="hidden"
            checked={fav}
            onChange={handleFav(id)}
          />
          {is_fav ? (
            <Icon
              icon="heroicons:star-20-solid"
              className="text-xl leading-[1] cursor-pointer text-[#FFCE30]"
            />
          ) : (
            <Icon
              icon="heroicons:star"
              className="text-xl leading-[1] cursor-pointer opacity-40 dark:text-white"
            />
          )}
        </label>

        <span
          className={` ${
            is_done ? "line-through dark:text-slate-300" : ""
          } flex-1 text-sm text-slate-600 dark:text-slate-300 truncate`}
        >
          {title}
        </span>

        <div className="flex">
          <span className="flex-none space-x-2 text-base text-secondary-500 flex rtl:space-x-reverse">
            {/* <div className="flex justify-start -space-x-1.5 min-w-[60px] rtl:space-x-reverse">
              {image?.map((img, i) => (
                <div
                  key={i}
                  className={` ${
                    is_done ? " opacity-40" : " opacity-100"
                  } h-6 w-6 rounded-full ring-1 ring-secondary-500`}
                >
                  <Tooltip placement="top" arrow content={img.label}>
                    <img
                      src={img.image}
                      alt={img.label}
                      className="w-full h-full rounded-full"
                    />
                  </Tooltip>
                </div>
              ))}
            </div> */}
            {category?.map((cta, ctaIndex) => (
              <div key={ctaIndex}>
                <span
                  className={` bg-opacity-20 capitalize font-normal text-xs leading-4 px-[10px] py-[2px] rounded-full inline-block
            
             ${cta.value === "team" ? "bg-danger-500 text-danger-500" : ""}
                  ${
                    cta.value === "low" ? "bg-success-500 text-success-500" : ""
                  }
                  ${
                    cta.value === "medium"
                      ? "bg-warning-500 text-warning-500"
                      : ""
                  }
                  ${
                    cta.value === "high"
                      ? "bg-primary-500 text-primary-500"
                      : ""
                  }
                  ${cta.value === "update" ? "bg-info-500 text-info-500" : ""}
            `}
                >
                  {cta.label}
                </span>
              </div>
            ))}

            <button
              type="button"
              className="text-slate-400"
              onClick={() => dispatch(editTodo(todo))}
            >
              <Icon icon="heroicons-outline:pencil-alt" />
            </button>
            <button
              type="button"
              onClick={() => handleDelete(id)}
              className="transition duration-150 hover:text-danger-500 text-slate-400"
            >
              <Icon icon="heroicons-outline:trash" />
            </button>
          </span>
        </div>
      </li>
    </>
  );
};

export default Tasks;
