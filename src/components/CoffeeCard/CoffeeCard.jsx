import React from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";

const CoffeeCard = ({ coffee, setCoffees, coffees }) => {
  const { _id, photo, name, price, quantity } = coffee;
  // delete function
  const handleDelete = (_id) => {
    console.log(_id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      //   console.log(result.isConfirmed);
      if (result.isConfirmed) {
        // start deleting the coffee
        fetch(`http://localhost:3000/coffees/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Coffee has been deleted.",
                icon: "success",
              });
              //   remove the coffee form the state
              const remainingCoffees = coffees.filter(
                (coff) => coff._id !== _id
              );
              setCoffees(remainingCoffees);
            }
            // console.log("After deleting the data", data);
          });
      }
    });
  };
  return (
    <div>
      <div className="card card-side bg-base-100 shadow-sm border-2">
        <figure>
          <img src={photo} alt="Movie" />
        </figure>
        <div className="flex justify-around w-full items-center">
          <div>
            <h2 className="">Name: {name}</h2>
            <p>Price: {price}</p>
            <p>Quantity : {quantity}</p>
          </div>
          <div className="card-actions justify-end">
            <div className="join join-vertical space-y-3">
              <Link to={`/coffee/${_id}`}>
                <button className="btn join-item bg-blue-300">View</button>
              </Link>
              <Link to={`/updateCoffee/${_id}`}>
                <button className="btn join-item bg-cyan-200">Edit</button>
              </Link>

              <button
                onClick={() => handleDelete(_id)}
                className="btn join-item bg-emerald-200"
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
