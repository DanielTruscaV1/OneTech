import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    // Here you can handle form submission, for example, send the data to an API
    console.log(formData);
  };

  return (
    <div className="w-screen h-screen relative">
      <div className="inline-block w-1/2 h-full relative">
        <div className="w-1/2 absolute left-1/4 top-16 border-2 rounded-3xl shadow-2xl">
          <h1 className="w-full mt-4 text-blue-500 hover:text-blue-700 text-3xl font-bold text-center">
            Sign-In
          </h1>
          <p className="w-full mt-4 text-gray-500 opacity-50 text-base text-center">
            Sign-In to your OneTech account.
          </p>
          <p className="w-1/2 ml-8 mt-4 text-gray-500 text-base">
            Email:
          </p>
          <input 
            type="email"
            className="w-5/6 h-8 ml-8 mt-2 text-gray-500 border-2 rounded-lg pl-4 pb-0.5"
          />
          <p className="w-1/2 ml-8 mt-4 text-gray-500 text-base">
            Password:
          </p>
          <input 
            type="password"
            className="w-5/6 h-8 ml-8 mt-2 text-gray-500 border-2 rounded-lg pl-4 pb-0.5"
          />
          <button className="ml-36 mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign-In
          </button>

          <p className="w-full my-4 text-gray-300 text-base text-center">
            If you do not have an account, please &nbsp;
            <span className="text-blue-500 hover:cursor-pointer">
              sign-up
            </span>
            .
          </p>
        </div>
      </div>

      <img 
        className="inline-block w-1/2 h-3/4 absolute top-16"
        src="/SignIn1.svg"
        alt="my image"
      />
    </div>
  );
};

export default SignIn;
