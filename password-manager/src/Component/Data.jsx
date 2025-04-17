import React, { useContext, useEffect } from "react";
import { DataContext } from "../Manager/Context";
import { ToastContainer, toast } from "react-toastify";
import { deletePassword, getPasswords } from "../api/apihandler";
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

  const handleDelete = async (id) => {
    try {
      await deletePassword(id);
      const updatedPasswords = await getPasswords(); // Refresh after delete
      setPasswordArray(updatedPasswords);
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  };

  const handleEdit = (id) => {
    const password = passwordArray.find((item) => item._id === id);

    if (!password) {
      console.error("Password entry not found for id:", id);
      return;
    }
    console.log(password);
    setForm({
      platform: password.platform,
      username: password.username,
      password: password.password,
      _id: password._id,
    });
  };

  return (
    <div className="mt-20 shadow px-2 py-2">
      <ToastContainer />

      {passwordArray.length === 0 && <div>No password to show</div>}

      {/* ✅ Desktop Table */}
      {passwordArray.length !== 0 && (
        <div className=" md:block hidden">
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
                      {item.platform}
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
                      onClick={() => handleEdit(item._id)}
                    />
                    <lord-icon
                      src="https://cdn.lordicon.com/wpyrrmcq.json"
                      trigger="hover"
                      style={{ width: "30px", height: "50px" }}
                      className=" cursor-pointer"
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 📱 Mobile Card Layout */}
      <div className="md:hidden flex flex-col gap-3">
        {passwordArray.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-md p-3 my-2 shadow-sm flex flex-col gap-4"
          >
            {
              <div className="text-sm rounded-full bg-red-400 w-fit text-white px-2.5 py-0.5">
                {index + 1}
              </div>
            }
            <div className="flex items-center gap-2">
              <span className="font-semibold">URL:</span>
              <span className="max-w-[180px] overflow-auto scroll-auto">
                {item.platform}
              </span>
              <lord-icon
                src="https://cdn.lordicon.com/iykgtsbt.json"
                trigger="hover"
                style={{ width: "40px", height: "20px" }}
                className="cursor-pointer"
                onClick={() => copyText(item.username)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Username:</span>
              <span className="max-w-[180px] overflow-auto scroll-auto">
                {item.username}
              </span>
              <lord-icon
                src="https://cdn.lordicon.com/iykgtsbt.json"
                trigger="hover"
                style={{ width: "40px", height: "20px" }}
                className="cursor-pointer"
                onClick={() => copyText(item.username)}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Password:</span>
              <input
                className="border-none outline-none rounded px-1 text-sm tracking-wide max-w-[110px] "
                // style={{ width: `${item.password.length + 2}ch` }}
                type={visiblePasswords[index] ? "text" : "password"}
                value={item.password}
                readOnly
              />

              <img
                src={visiblePasswords[index] ? eyeOpen : eyeCross}
                onClick={() => togglePasswordVisibility(index)}
                alt=""
                className="w-5 cursor-pointer"
              />
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
                onClick={() => handleEdit(item._id)}
              />
              <lord-icon
                src="https://cdn.lordicon.com/wpyrrmcq.json"
                trigger="hover"
                style={{ width: "30px", height: "40px" }}
                className="cursor-pointer"
                onClick={() => handleDelete(item._id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Data;
