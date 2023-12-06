import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { editTodo, closeEditModal } from "./store";
import Icon from "@/components/ui/Icon";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

const FormValidationSchema = yup
  .object({
    title: yup.string().required("Title is required"),
  })
  .required();

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
  }),
};

const assigneeOptions = [
  {
    value: "mahedi",
    label: "Mahedi Amin",
    image: "/assets/images/avatar/av-1.svg",
  },
  {
    value: "sovo",
    label: "Sovo Haldar",
    image: "/assets/images/avatar/av-2.svg",
  },
  {
    value: "rakibul",
    label: "Rakibul Islam",
    image: "/assets/images/avatar/av-3.svg",
  },
  {
    value: "pritom",
    label: "Pritom Miha",
    image: "/assets/images/avatar/av-4.svg",
  },
];
const options = [
  {
    value: "team",
    label: "team",
  },
  {
    value: "low",
    label: "low",
  },
  {
    value: "medium",
    label: "medium",
  },
  {
    value: "high",
    label: "high",
  },
  {
    value: "update",
    label: "update",
  },
];

const OptionComponent = ({ data, ...props }) => {
  //const Icon = data.icon;

  return (
    <components.Option {...props}>
      <span className="flex items-center space-x-4">
        <div className="flex-none">
          <div className="h-7 w-7 rounded-full">
            <img
              src={data.image}
              alt=""
              className="w-full h-full rounded-full"
            />
          </div>
        </div>
        <span className="flex-1">{data.label}</span>
      </span>
    </components.Option>
  );
};

const EditTodoModal = () => {
  const { editModal, editItem } = useSelector((state) => state.todo);
  const { token, token_type } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),

    mode: "all",
  });

  useEffect(() => {
    reset(editItem);
  }, [editItem]);

  const onSubmit = async (data) => {
    const { title, tags, description } = data;

    const category = tags;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/todos/${editItem.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token_type}${token}`,
          },
          body: JSON.stringify({ title, category, description }),
        }
      );

      const data = await response.json();

      if (data.meta.status === "success") {
        let payload = data.data;

        dispatch(editTodo(payload));
      } else {
        // Display error toast
        toast.error(data.meta.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      console.log(error);
    }

    // dispatch(
    //   editTodo({
    //     id: editItem.id,
    //     title: data.title,
    //     image: data.assign,
    //     category: data.tags,
    //   })
    // );
    dispatch(closeEditModal(false));
    toast.info("Edit Successfully", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <Modal
      title="Edit Task"
      activeModal={editModal}
      onClose={() => dispatch(closeEditModal(false))}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
        <div className={`fromGroup  ${errors.title ? "has-error" : ""}`}>
          <div className=" relative">
            <input
              type="text"
              defaultValue={editItem.title}
              {...register("title")}
              className="form-control py-2"
            />
            {errors.title && (
              <div className="flex text-xl absolute ltr:right-[14px] rtl:left-[14px] top-1/2 -translate-y-1/2  space-x-1 rtl:space-x-reverse">
                <span className="text-danger-500">
                  <Icon icon="heroicons-outline:information-circle" />
                </span>
              </div>
            )}
          </div>
          {errors.title && (
            <div className="mt-2 text-danger-500 block text-sm">
              {errors.title?.message}
            </div>
          )}
        </div>

        {/* <div className={errors.assign ? "has-error" : ""}>
          <label className="form-label" htmlFor="icon_s">
            Assignee
          </label>
          <Controller
            name="assign"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={assigneeOptions}
                styles={styles}
                className="react-select"
                classNamePrefix="select"
                isSearchable={false}
                defaultValue={editItem.image}
                isMulti
                components={{
                  Option: OptionComponent,
                }}
                id="icon_s"
              />
            )}
          />
          {errors.assign && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.assign?.message || errors.assign?.label.message}
            </div>
          )}
        </div>
        <div>
          <label htmlFor="default-picker" className=" form-label">
            Due Date
          </label>
          <Flatpickr className="form-control py-2" id="default-picker" />
        </div> */}
        <div className={errors.tags ? "has-error" : ""}>
          <label className="form-label" htmlFor="icon_s">
            Tag
          </label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                styles={styles}
                className="react-select"
                defaultValue={editItem.category}
                classNamePrefix="select"
                isMulti
                id="icon_s"
              />
            )}
          />
          {errors.assign && (
            <div className=" mt-2  text-danger-500 block text-sm">
              {errors.tags?.message || errors.tags?.label.message}
            </div>
          )}
        </div>
        <Textarea
          name="description"
          label="description"
          placeholder="description"
          defaultValue={editItem.description}
          register={register}
        />

        <div className="ltr:text-right rtl:text-left">
          <button className="btn btn-dark  text-center">Update</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditTodoModal;
