import React, { useContext, useEffect } from "react";
import { DataContext } from "../Manager/Context";
import { ToastContainer, toast } from "react-toastify";
function Data() {
  const {
    setForm,
    form,
    setPasswordArray,
    passwordArray,
    show,
    handleEye,
    eyeOpen,
    eyeCross,
    visiblePasswords,
    togglePasswordVisibility,
  } = useContext(DataContext);
  const copyText = (text) => {
    toast("Copy to Clipboard");
    navigator.clipboard.writeText(text);
  };

  const handleDelete = (id) => {
    console.log("deleting icon", id);
    setPasswordArray(passwordArray.filter((item) => item.id != id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id != id))
    );
  };

  const handleEdit = (id) => {
    console.log("edit the icon", id);
    const password = passwordArray.find((item) => item.id === id);
    setForm(password);
    // setPasswordArray(passwordArray.filter((item)=>item.id!=id));
    // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter((item)=>item.id!=id)));
  };

  return (
    <div className="mt-20 shadow px-2 py-2">
      <ToastContainer />

      {passwordArray.length === 0 && <div>No password to show</div>}

      {/* ✅ Desktop Table */}
      {passwordArray.length !== 0 && (
        <div className=" md:block">
          <table className="table-auto w-full rounded-md overflow-hidden">
            <colgroup>
              <col className="w-20" />
              <col className="w-32" />
              <col className="w-30" />
              <col className="w-44" />
              <col className="w-25" />
            </colgroup>
            <thead className="bg-gray-500 text-white">
              <tr>
                <th className="py-1">SNo</th>
                <th className="py-1">Url</th>
                <th className="py-1">Username</th>
                <th className="py-1">Password</th>
                <th className="py-1">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-gray-200 text-sm">
              {passwordArray.map((item, index) => (
                <tr key={index}>
                  <td className="py-1 text-center">{index + 1}</td>
                  <td className="text-center">
                    <div className="max-w-[300px] overflow-x-auto whitespace-nowrap">
                      {item.url}
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <div className="max-w-[300px] overflow-x-auto whitespace-nowrap">
                        {item.username}
                      </div>
                      <lord-icon
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                        style={{ width: "20px", height: "30px" }}
                        className="cursor-pointer"
                        onClick={() => copyText(item.username)}
                      />
                    </div>
                  </td>
                  <td className="text-center relative pl-2">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="max-w-[250px] overflow-x-auto whitespace-nowrap  ">
                        <input
                          className="text-center w-full ml-5 text-sm"
                          type={visiblePasswords[index] ? "text" : "password"}
                          value={item.password}
                          readOnly
                        />
                      </div>
                      <div className="flex items-center justify-between gap-0.5">
                        <img
                          src={visiblePasswords[index] ? eyeOpen : eyeCross}
                          onClick={() => togglePasswordVisibility(index)}
                          alt=""
                          className="w-5 cursor-pointer"
                        />

                        <lord-icon
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover"
                          style={{ width: "20px", height: "25px" }}
                          className="cursor-pointer"
                          onClick={() => copyText(item.password)}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="text-center  ">
                    <lord-icon
                      src="https://cdn.lordicon.com/gwlusjdu.json"
                      trigger="hover"
                      style={{ width: "30px", height: "50px" }}
                      className="mr-2 cursor-pointer"
                      onClick={() => handleEdit(item.id)}
                    />
                    <lord-icon
                      src="https://cdn.lordicon.com/wpyrrmcq.json"
                      trigger="hover"
                      style={{ width: "30px", height: "50px" }}
                      className=" cursor-pointer"
                      onClick={() => handleDelete(item.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 📱 Mobile Card Layout */}
      {/* <div className="md:hidden">
    {passwordArray.map((item, index) => (
      <div key={index} className="bg-gray-100 rounded-md p-3 my-2 shadow-sm">
        {/* <div className="text-sm text-gray-600">{index + 1}</div> */}
      {/* <div><span className="font-semibold">URL:</span> {item.url}</div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Username:</span>
          <span>{item.username}</span>
          <lord-icon
            src="https://cdn.lordicon.com/iykgtsbt.json"
            trigger="hover"
            style={{ width: "20px", height: "20px" }}
            className="cursor-pointer"
            onClick={() => copyText(item.username)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Password:</span>
          <span>{item.password}</span>
          <lord-icon
            src="https://cdn.lordicon.com/iykgtsbt.json"
            trigger="hover"
            style={{ width: "20px", height: "20px" }}
            className="cursor-pointer"
            onClick={() => copyText(item.password)}
          />
          
        </div>
        <div className="mt-2 flex gap-3">
          <lord-icon
            src="https://cdn.lordicon.com/gwlusjdu.json"
            trigger="hover"
            style={{ width: "30px", height: "40px" }}
            className="cursor-pointer"
            onClick={() => handleEdit(item.id)}
          />
          <lord-icon
            src="https://cdn.lordicon.com/wpyrrmcq.json"
            trigger="hover"
            style={{ width: "30px", height: "40px" }}
            className="cursor-pointer"
            onClick={() => handleDelete(item.id)}
          />
        </div>
      </div>
    ))}
  </div>  */}
    </div>
  );
}

export default Data;
