import React from "react";
import Image from "next/image";
import icon from "@/assets/dashboard/images/icon/icon_22.svg";

const ProjectsModel = ({ item, index }: { item: any, index: number }) => {

  return (
    <div
      className="modal fade"
      id={`projectsModel${index}`}
      tabIndex={-2}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="remove-account-popup text-center modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ cursor: "pointer" , position: "absolute", top: "20px", right: "30px"}}
            ><i className="bi bi-x-lg"></i></button>
            <div className="">

              {item.image && (
                <Image
                  src={`https://fipiqdxkchoddvgjmhdz.supabase.co/storage/v1/object/public/project_images/${item.image}`}
                  alt=""
                  className="w-100  lazy-img rounded "
                  style={{ width: "auto", height: "auto", objectFit: "contain" }}
                  width={300}
                  height={300}
                />
              )}

              <h3 >{item.title}</h3>
              <p>{item.description}</p>
              <div className="row">
                <a href={item.github} target="_blank" rel="noreferrer" className="col-6 d-flex align-items-center justify-content-center gap-3 cursor-pointer"><i className="bi bi-github  " style={{ fontSize: "25px" }}></i><h3 style={{ margin: "0", padding: "0", fontSize: "18px", fontWeight: "500", color: 'gray' }}>
                  View Code
                </h3>
                </a>
                <a href={item.live} target="_blank" rel="noreferrer" className="col-6 d-flex align-items-center justify-content-center gap-3 cursor-pointer"><i className="bi bi-globe" style={{ fontSize: "25px" }}></i><h3 style={{ margin: "0", padding: "0", fontSize: "18px", fontWeight: "500", color: 'gray' }}>
                  View Live
                </h3>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsModel;
