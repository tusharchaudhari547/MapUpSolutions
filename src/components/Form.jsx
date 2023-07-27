import React, { useState } from "react";
import { Select, Form, Button } from "antd";

function RegionForm({ handleRegionSelect }) {
  const [region, setRegion] = useState(null);
  const onChange = (value: string) => {
    setRegion(value);
  };
  const onFinish = () => {
    const selectedRegion = {
      name: region, // Name of the selected region
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [68.176645, 7.965534],
            [97.402561, 28.07673],
            [77.837451, 37.084107],
            [68.176645, 7.965534],
          ],
        ],
      },
    };

    handleRegionSelect(selectedRegion);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  return (
    <div>
      <Form
        name="region"
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Region"
          name="Region"
          rules={[
            {
              required: true,
              message: "Please select region!",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a region"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "United States",
                label: "United States",
              },
              {
                value: "India",
                label: "India",
              },
              {
                value: "United Kingdom",
                label: "United Kingdom",
              },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Load
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RegionForm;
