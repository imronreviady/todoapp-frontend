import React, { useState } from "react";
import Select, { components } from "react-select";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { openAddModal, addTodo } from "./store";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FormValidationSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    tags: yup.mixed().required("Tag is required"),
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

const AddTodo = () => {
  const { addModal } = useSelector((state) => state.todo);
  const { token, token_type } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    const { title, tags, description } = data;

    const category = tags;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token_type}${token}`,
        },
        body: JSON.stringify({ title, category, description }),
      });

      const data = await response.json();

      if (data.meta.status === "success") {
        let payload = data.data;

        dispatch(addTodo(payload));
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

    dispatch(openAddModal(false));
    data.title = "";
    data.tags = "";
    data.assign = "";
  };
  return (
    <div>
      <Modal
        title="Add Task"
        labelclassName="btn-outline-dark"
        activeModal={addModal}
        onClose={() => dispatch(openAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <Textinput
            name="title"
            label="title"
            type="text"
            placeholder="Enter title"
            register={register}
            error={errors.title}
          />
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
          </div> */}
          {/* <div>
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
            register={register}
            error={errors.description}
          />

          <div className="ltr:text-right rtl:text-left">
            <button className="btn btn-dark  text-center">Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTodo;
