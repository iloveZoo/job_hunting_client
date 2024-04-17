import {useState, } from 'react';
import Button2  from "../Button/Button2";
import Button3  from "../Button/Button3";
import Input2  from "../Input/Input2";
import { FiPlus } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import  SidebarItem  from "../Item/SidebarItem";
import { TbMessage2 } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { FaGripLinesVertical } from "react-icons/fa";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";

const Sidebar = ({children, data}) => {

    const [isColapse, setIsColapse] = useState(false);
    const [isColapseHover, setIsColapseHover] = useState(false);
    
    const [isSidebarBtnClose, setIsSidebarBtnClose] = useState(true);

    const onSearchBtnClick = (value) => {
        if(value) {
          setIsSidebarBtnClose(!isSidebarBtnClose);
        }
      }
    
      const onNewChatBtnClick = (value) => {
        console.log(value);
        if(value){
          setIsSidebarBtnClose(!isSidebarBtnClose);
        } 
    }

    const renderHistories = (items) => {
        if(data.items) {
            // today
            const today = new Date();
            // yesterday
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            // previous 7 days
            const previous7Days = new Date(today);
            previous7Days.setDate(previous7Days.getDate() - 7);
            // previous 30 days
            const previous30Days = new Date(today);
            previous30Days.setDate(previous30Days.getDate() - 30);

            const todayItems = data.items.filter(item => new Date(item.create_time) > today);

            const yesterdayItems = data.items.filter(item => new Date(item.create_time) > yesterday && new Date(item.create_time) < today);

            const previous7DaysItems = data.items.filter(item => new Date(item.create_time) > previous7Days && new Date(item.create_time) < yesterday);

            const previous30DaysItems = data.items.filter(item => new Date(item.create_time) > previous30Days && new Date(item.create_time) < previous7Days);

            console.log('todayItems',todayItems)
            console.log('yesterdayItems',yesterdayItems)
            console.log('previous7DaysItems',previous7DaysItems)
            console.log('previous30DaysItems',previous30DaysItems)

            const renderItems = (items) => {
                return items.map(item => {
                    return <SidebarItem icon={<TbMessage2/>}>{item.title}</SidebarItem>
                })
            }

            return (
                <>
                    {
                        todayItems.length > 0?
                        <>
                            <div className={'w-full flex justify-between'}>
                                <span   span className={'text-sm text-slate-500'}>Today</span>
                            </div>
                            <div className="w-full h-0.5 my-3 bg-violet-100"></div>
                            {renderItems(todayItems)}
                        </>:<></>
                    }
                    
                    { 
                        yesterdayItems.length > 0?
                        <>
                            <div className={'w-full flex justify-between'}>
                                <span className={'text-sm text-slate-500'}>Yesterday</span>
                            </div>
                            <div className="w-full h-0.5 my-3 bg-violet-100"></div>
                            {renderItems(yesterdayItems)}
                        </>:<></>
                    }

                    {
                        previous7DaysItems.length > 0?
                        <>
                            <div className={'w-full flex justify-between'}>
                                <span className={'text-sm text-slate-500'}>Previous 7 days</span>
                            </div>
                            <div className="w-full h-0.5 my-3 bg-violet-100"></div>
                            {renderItems(previous7DaysItems)}
                        </>:<></>
                    }
                    
                    {
                        previous30DaysItems.length > 0?
                        <>
                            <div className={'w-full flex justify-between'}>
                                <span className={'text-sm text-slate-500'}>Previous 30 days</span>
                            </div>
                            <div className="w-full h-0.5 my-3 bg-violet-100"></div>
                            {renderItems(previous30DaysItems)}
                        </>:<></>
                    }
                </>
            )
        }   
    }   

  return (
    <div className={'flex'}>
        <div className={`flex flex-col items-center bg-white/50 rounded-3xl relative transition-all ease-in-out ${isColapse?'invisible w-0 opacity-0':'min-w-96'}`}>
            <div className={`flex flex-col items-center  h-full px-3 py-4`}>
                <div  className={`flex flex-col items-center h-full`}>
                    <h4 className={'font-bold mb-4'}>Job hunting</h4>
                    {/* sidebar button */}
                    <div className={'flex w-full'}>
                        <Button2 className={'text-white mr-3 p-2 rounded-full bg-violet-300'} icon={<FiPlus/>} onClick={onNewChatBtnClick} iconOnly={isSidebarBtnClose}>New Chat</Button2>
                        <Input2 className={'text-white p-2 rounded-full bg-violet-900 '} icon={<IoSearch/>} onClick={onSearchBtnClick} iconOnly={!isSidebarBtnClose} placeholder={'Search conversation...'}/>
                    </div>

                    {/* clear conversation */}
                    <div className="w-full h-0.5 my-3 bg-violet-100"></div>
                    <div className={'w-full flex justify-between p-2'}>
                        <span className={'text-sm text-slate-500'}>Your conversations</span>
                        <button className={'text-sm font-bold text-violet-500 hover:text-violet-700 hover:underline hover:decoration-solid transition-all easy-in-out'}>clear all</button>
                    </div>

                    <div className="w-full h-0.5 my-3 bg-violet-100"></div>
                    {/*chat histories*/}
                    <div className={`overflow-y-auto max-w-80 w-full h-full`}>
                        {renderHistories()}
                    </div>
                    {/* Settings */}
                    <div className={'relative flex flex-col-reverse w-full pt-4'}>
                        <Button3 icon={<img src="/img/avatar.png" alt="logo" className="h-full w-full object-cover object-center rounded-full"/>}>Lê Văn Đạt</Button3>
                        <Button3 icon={<IoSettingsOutline/>} className={`mb-3`}>Settings</Button3>
                    </div>
                </div>
            </div>
        </div>

        {/*colapse button  */}
        <button className="transition-opacity ease-linear delay-100 hover:bg-white/10 rounded-full " onClick={()=>setIsColapse(!isColapse)} onMouseEnter={()=>setIsColapseHover(true)} onMouseLeave={()=>setIsColapseHover(false)}>
            <span className={`text-xl w-7 text-slate-400 flex justify-center transition-opacity ease-linear delay-100 ${isColapse || isColapseHover?'invisible w-0 h-0 opacity-0':''}`}><FaGripLinesVertical/></span>
            <span className={`text-3xl w-7 text-slate-900 flex justify-center transition-opacity ease-linear delay-100 ${!isColapse&&isColapseHover?'':'invisible w-0 h-0 opacity-0'}`}><BsChevronCompactLeft/></span>
            <span className={`text-3xl w-7 text-slate-900 flex justify-center transition-opacity ease-linear delay-100 ${isColapse?'':'invisible w-0 h-0 opacity-0'}`}><BsChevronCompactRight/></span>
        </button>
    </div>
)
};

  export default Sidebar;
  