import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Space, Table, Tag, Modal, Form, Input, Select } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { AppState } from "../store";
import {
  addRecord,
  deleteRecord,
  getRecords,
  updateRecord,
} from "../store/actions/recordAction";
import { getCategories } from "../store/actions/categoryActions";

import { Record, RecordDispatch, RecordForm } from "../types/record";
import { Category, CategoryDispatch } from "../types/category";
import { Mode } from "../types/general";

const emptyForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: 0,
};

const Records = () => {
  const { data, loading } = useSelector((state: AppState) => state.records);
  const { data: categories } = useSelector(
    (state: AppState) => state.categories
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<RecordForm>(emptyForm);
  const [formId, setFormId] = useState<number | null>(null);

  const showOrCloseModal = (mode: Mode, isShow: boolean) => {
    setIsModalOpen(isShow);
    setMode(mode);
  };

  const handleOk = () => {
    switch (mode) {
      case "new":
        dispatchRecord(addRecord(form));
        break;
      case "edit":
        dispatchRecord(updateRecord(form, formId as number));
        break;
      case "delete":
        dispatchRecord(deleteRecord(formId as number));
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

  const handleUpdate = (record: Record) => {
    showOrCloseModal("edit", true);

    const { title, amount } = record;
    const category_id = record.category.id;
    setForm({ title, amount, category_id });
    setFormId(record.id);
  };

  const handleDelete = (id: Record["id"]) => {
    showOrCloseModal("delete", true);
    setFormId(id);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, title: e.target.value });
  };
  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, amount: Number(e.target.value) });
  };
  const onChangeCategory = (category_id: number) => {
    setForm({ ...form, category_id });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: Record["amount"]) => {
        return (
          <>
            {Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(amount)}
          </>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Category, record: Record) => {
        return <Tag color={category.color}>{category.name.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string, record: Record) => {
        return (
          <>
            {new Date(updatedAt).toLocaleString("tr-TR", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_text: string, record: Record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "#0390fc" }}
            onClick={() => {
              handleUpdate(record);
            }}
          />
          <DeleteOutlined
            style={{ color: "#c20808" }}
            onClick={() => {
              handleDelete(record.id);
            }}
          />
        </Space>
      ),
    },
  ];

  const modalTitle =
    mode === "edit"
      ? "Update Record"
      : mode === "delete"
      ? "Delete Record"
      : "New Record";

  const dispatchRecord = useDispatch<RecordDispatch>();
  const dispatchCategories = useDispatch<CategoryDispatch>();

  useEffect(() => {
    dispatchRecord(getRecords());
    !categories.length && dispatchCategories(getCategories());
  }, [categories.length, dispatchRecord, dispatchCategories]);

  const isValidForm = form.title && form.amount !== 0 && form.category_id !== 0;

  return (
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
          New Record
        </Button>
      </div>

      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !isValidForm && mode !== "delete" }}
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
            <Form.Item label="Record Title" required>
              <Input name="title" value={form.title} onChange={onChangeTitle} />
            </Form.Item>
            <Form.Item label="Amount" required>
              <Input
                name="amount"
                type="number"
                value={form.amount}
                onChange={onChangeAmount}
              />
            </Form.Item>
            <Form.Item label="Select a category">
              <Select
                value={form.category_id}
                defaultValue={form.category_id}
                onChange={onChangeCategory}
              >
                <Select.Option value={0} disabled>
                  Select a Category
                </Select.Option>
                {categories.map((category) => (
                  <Select.Option value={category.id} key={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        ) : mode === "delete" ? (
          <span> Are you sure?</span>
        ) : null}
      </Modal>

      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
};

export default Records;
