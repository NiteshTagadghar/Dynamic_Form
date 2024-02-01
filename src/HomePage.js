import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const [fields, setFields] = useState([
    { label: 'First Name', type: 'text', value: '' },
    { label: 'Last Name', type: 'text', value: '' }
  ]);

  const [newField, setNewField] = useState({ label: '', type: 'text', options: [], value: '', checked: false });
  const [showOptionsInput, setShowOptionsInput] = useState(false);

  const handleAddField = (e) => {
    e.preventDefault();

    if ((newField.type === 'dropdown' || newField.type === 'radio') && newField.options.length === 0) {
      alert('Please enter options for the dropdown or radio button.');
      return;
    }

    setFields([...fields, { ...newField }]);
    setNewField({ label: '', type: 'text', options: [], value: '', checked: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = fields.every(field => field.label.trim());
    if (isValid) {
      const formData = fields.reduce((data, field) => {
        data[field.label] = field.value;
        return data;
      }, {});

      localStorage.setItem('formData', JSON.stringify(formData));
      navigate('/success');
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8 mt-8">
      <h1 className='text-2xl font-bold mb-4 text-center'>Dynamic Form</h1>

      <form className="grid gap-4 bg-gray-300 p-3" onSubmit={handleAddField}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="label" className="block">Label</label>
            <input
              id="label"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              type="text"
              placeholder="Enter label"
              value={newField.label}
              onChange={(e) => setNewField({ ...newField, label: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="input-type" className="block">Input Type</label>
            <select
              id="input-type"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              value={newField.type}
              required
              onChange={(e) => {
                setNewField({ ...newField, type: e.target.value });
                setShowOptionsInput(e.target.value === 'dropdown' || e.target.value === 'radio');
              }}
            >
              <option value="" disabled>Select an input type</option>
              <option value="text">Text Input</option>
              <option value="textarea">Text Area</option>
              <option value="dropdown">Dropdown</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio Button</option>
            </select>
          </div>
        </div>
        {showOptionsInput && (newField.type === 'dropdown' || newField.type === 'radio') && (
          <input
            type="text"
            placeholder={`Enter ${newField.type === 'dropdown' ? 'options' : 'radio options'} separated by commas`}
            value={newField.options.join(',')}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            onChange={(e) => setNewField({ ...newField, options: e.target.value.split(',').map(option => option.trim()) })}
            required
          />
        )}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" type='submit'>Add Field</button>
      </form>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            {field.type === 'textarea' ? (
              <div className="space-y-2">
                <label htmlFor="message" className="block">{field.label}</label>
                <textarea
                  required
                  value={field.value}
                  onChange={(e) => {
                    const newFields = [...fields];
                    newFields[index].value = e.target.value;
                    setFields(newFields);
                  }}
                  id="message"
                  placeholder="Enter your message"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                ></textarea>
              </div>
            ) : field.type === 'dropdown' ? (
              <div className="space-y-2">
                <label htmlFor="options" className="block">Options</label>
                <select
                  value={field.value}
                  required
                  onChange={(e) => {
                    const newFields = [...fields];
                    newFields[index].value = e.target.value;
                    setFields(newFields);
                  }}
                  id="options"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  {field.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) : field.type === 'checkbox' ? (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="border-gray-300 rounded"
                  id={field.label}
                  checked={field.checked || false}
                  required
                  onChange={(e) => {
                    const newFields = [...fields];
                    newFields[index].checked = e.target.checked;
                    newFields[index].value = e.target.checked;
                    setFields(newFields);
                  }}
                />
                <label htmlFor="terms" className="block">{field.label}</label>
              </div>
            ) : field.type === 'radio' ? (
              <div className='flex'>
                {field.options.map((option, optionIndex) => (
                  <div key={optionIndex} className='mr-2'>
                    <input
                      type="radio"
                      id={`${field.label}-${optionIndex}`}
                      name={field.label}
                      value={option}
                      checked={field.value === option}
                      required
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        const updatedFields = fields.map((field, idx) => {
                          if (idx === index) {
                            return { ...field, value: selectedValue };
                          }
                          return field;
                        });
                        setFields(updatedFields);
                      }}
                    />
                    <label className='ml-1' htmlFor={`${field.label}-${optionIndex}`}>{option}</label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                <label htmlFor="name" className="block">{field.label}</label>
                <input
                  id="name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  type="text"
                  value={field.value}
                  onChange={(e) => {
                    const newFields = [...fields];
                    newFields[index].value = e.target.value;
                    setFields(newFields);
                  }}
                  required
                />
              </div>
            )}
          </div>
        ))}

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mb-2" type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default HomePage;
