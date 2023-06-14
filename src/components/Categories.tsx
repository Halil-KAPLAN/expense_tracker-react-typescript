import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Color } from "antd/es/color-picker";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Tag,
  ColorPicker,
  Space,
} from "antd";

import {
  Category,
  CategoryDispatch,
  CategoryForm,
  CategoryType,
} from "../types/category";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../store/actions/categoryActions";
import { AppState } from "../store";
import { Mode } from "../types/general";

const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black",
};

const Categories = () => {
  const { data, loading } = useSelector((state: AppState) => state.categories);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [formId, setFormId] = useState<number | null>(null);

  const showOrCloseModal = (mode: Mode, isShow: boolean) => {
    setIsModalOpen(isShow);
    setMode(mode);
  };

  const handleOk = () => {
    switch (mode) {
      case "new":
        dispatch(addCategory(form));
        break;
      case "edit":
        dispatch(updateCategory(form, formId as number));
        break;
      case "delete":
        dispatch(deleteCategory(formId as number));
        break;
    }

    showOrCloseModal("new", false);
    setForm(emptyForm);
    setFormId(null);
  };

  const handleCancel = () => {
    showOrCloseModal("new", false);
    setForm(emptyForm);
    setFormId(null);
  };

  const handleUpdate = (category: Category) => {
    showOrCloseModal("edit", true);
    setForm(category);
    setFormId(category.id);
  };

  const handleDelete = (id: Category["id"]) => {
    showOrCloseModal("delete", true);
    setFormId(id);
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, name: e.target.value });
  };

  const onChangeType = (type: CategoryType) => setForm({ ...form, type });

  const onChangeColor = (_color: Color, hex: string) =>
    setForm({ ...form, color: hex });

  const dispatch: CategoryDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const modalTitle =
    mode === "edit"
      ? "Update Category"
      : mode === "delete"
      ? "Delete Category"
      : "New Category";

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => {
        return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, category: Category) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "#0390fc" }}
            onClick={() => {
              handleUpdate(category);
            }}
          />
          <DeleteOutlined
            style={{ color: "#c20808" }}
            onClick={() => {
              handleDelete(category.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              showOrCloseModal("new", true);
            }}
          >
            New Category
          </Button>
        </div>
        <Modal
          title={modalTitle}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !form.name && mode !== "delete" }}
        >
          {mode === "edit" || mode === "new" ? (
            <Form
              name="basic"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              autoComplete="off"
            >
              <Form.Item label="Category Name" required>
                <Input name="name" value={form.name} onChange={onChangeName} />
              </Form.Item>
              <Form.Item label="Select">
                <Select
                  value={form.type}
                  defaultValue="expense"
                  onChange={onChangeType}
                >
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expense">Expense</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Color">
                <ColorPicker value={form.color} onChange={onChangeColor} />
              </Form.Item>
            </Form>
          ) : mode === "delete" ? (
            <span> Are you sure?</span>
          ) : null}
        </Modal>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="id"
      />
    </>
  );
};

export default Categories;
