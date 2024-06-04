import { MoreVertical, Users } from "lucide-react";
import profile from "../../../assets/profile.webp";
import { Link, useParams } from "react-router-dom";
import AsideSelectionComponent from "./AsideSelectionComponent";
import React, { useEffect } from "react";
import { img_User_baseUrl } from "../../../utils/common/baseUrl";
<<<<<<< HEAD
const AsideComponent =  ({
=======
const AsideComponent = ({
>>>>>>> 96cfaac92e66ddf8019483038e5125e0dac5c195
  conversations,
  setewGroup,
  setIsMore,
  isMore,
  setAside,
  render,
  setIsGroupChat,
}: any) => {
  const { user_id } = useParams();
  const DateToTime = (lastMessageDate: any) => {
    const date = new Date(lastMessageDate);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h12",
      hour12: true,
    });
  };
  
  useEffect(()=>{    
    console.log(conversations,"CONVERSATIONS");
    console.log(conversations?.length,"conversations?.length");
    
  },[conversations,render])

  const handleMoreOption = () => {
    setIsMore(!isMore);
  };

  const handleNewgroup = () => {
    setIsMore(false);
    setewGroup(1);
  };

  return (
    <>
      <div className={`${user_id!="index" ? "hidden" : ""} sm:flex sidebar w-96 bg-[#EBE9EF] min-w-60 flex-col border-r border-gray-300 transition-all`}>
        <div className="logo flex items-center justify-center py- my-7  font-medium flex-col ">
          <div className="w-full h-[70px]  flex justify-between items-center ">
            <div className="w-11/12  h-full flex justify-center items-center text-3xl ml-4">
              Messages
            </div>
            <div className=" h-full w-1/12 justify-center items-center flex mt-2">
              <MoreVertical size={20} onClick={handleMoreOption} />
            </div>
          </div>
          {isMore && (
            <>
              <div className="fixed bg-white w-32 h-10 ml-[50%] md:ml-[10%] border border-[#C1506D]  mt-8 rounded-md flex flex-col justify-between">
                <div
                  className="w-full h-full justify-center items-center flex border-[#C1506D] border-b gap-2"
                  onClick={handleNewgroup}
                >
                  <Users size={15} /> <p className="text-sm">New Group</p>
                </div>
              </div>
            </>
          )}

          <AsideSelectionComponent
            setAside={setAside}
            setIsGroupChat={setIsGroupChat}
          />
        </div>
        <div className="overflow-auto scrollbar-hide ">
          {conversations?.length
            ? conversations.map((data: any, index: number) => {
              console.log(data,"datadata");
              
                if (data.email) {
                  return (
                    <div
                      className={`list flex cursor-pointer border-b border-gray-300 transition-all p-2 items-center h-[70px] ${
                        user_id == data.receiverId ? "bg-gray-300" : ""
                      }`}
                      key={index}
                    >
                      <Link to={`/profile/${data?.receiverId}`}>
                        <img
                          src={
                            data?.profile?.startsWith("https://")
                              ? `${data?.profile}`
                              : data?.profile
                              ? `${img_User_baseUrl}${data?.profile}`
                              : `${profile}`
                          }
                          alt="P"
                          className="rounded-full mr-2 w-[50px] h-[50px]"
                        />
                      </Link>
                      <Link
                        to={`/message/${data.receiverId}`}
                        className="info flex-1"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold">{data?.name}</span>
                          <span className="font-light text-sm">
                            {data?.email?.slice(0, 16)}...
                          </span>
                        </div>
                      </Link>
                      <div className="flex flex-col">
                        {data.newMessageCount != 0 &&
                          data.newMessageCount != undefined &&
                          data.recereceiverId !== user_id && (
                            <span className="flex justify-end">
                              <p className="bg-green-500 w-4 h-4 rounded-full text-center text-xs">
                                {data.newMessageCount}
                              </p>
                            </span>
                          )}
                        <span className="text-gray-600 text-end text-xs">
                          {DateToTime(data?.lastUpdate)}
                        </span>
                      </div>
                    </div>
                  );
                } else {
                  return null; // Or some fallback UI if required
                }
              })
            : ""}
        </div>
      </div>
    </>
  );
}

export default AsideComponent;
