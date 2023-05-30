import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Color } from "antd/es/color-picker";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Tag,
  ColorPicker,
} from "antd";

import {
  Category,
  CategoryDispatch,
  CategoryForm,
  CategoryType,
} from "../types/category";
import { addCategory, getCategories } from "../store/actions/categoryActions";
import { AppState } from "../store";

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
  // {
  //   title: "Action",
  //   key: "action",
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite {record.name}</a>
  //       <a>Delete</a>
  //     </Space>
  //   ),
  // },
];

type Mode = "new" | "edit";

const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black",
};

const Categories = () => {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm);

  const showModal = (mode: Mode) => {
    setIsModalOpen(true);
    setMode(mode);
  };

  const handleOk = () => {
    dispatch(addCategory(form));
    setIsModalOpen(false);
    setMode("new");
    setForm(emptyForm);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setMode("new");
    setForm(emptyForm);
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

  const modalTitle = mode === "edit" ? "Update Category" : "New Category";

  return (
    <>
      <div>
        <Button
          type="primary"
          onClick={() => {
            showModal("new");
          }}
        >
          New Category
        </Button>
        <Modal
          title={modalTitle}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !form.name }}
        >
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
              <Select defaultValue={form.type} onChange={onChangeType}>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Color">
              <ColorPicker value={form.color} onChange={onChangeColor} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Categories;
