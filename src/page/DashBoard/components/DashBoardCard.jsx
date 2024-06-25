const DashBoardCard = (props) => {
    const { title, value, icon, hover, max } = props
    return <div title={hover} className={`${max ? 'w-[220px]' : 'w-[160px]'} dashboard-card flex p-1 items-center overflow-hidden h-[100px] border-[1px] border-red-custom rounded-[8px] bg-gray98 shadow-md`}>
        <div className="flex items-center m-auto">
            <div className="rounded-[50%] bg-red-custom w-[45px] h-[45px] p-[10px] border-[1px] border-light-gray flex ">
                <img src={icon} alt="" className="object-cover object-center h-full w-full m-auto" />
            </div>
            <div className="ml-[14px]">
                <p className="text-[22.5px] text-red-custom font-medium mb-[4px] tracking-[0.5px]">{title}</p>
                <p className="text-[16.5px] font-bold text-gray">{value}</p>
            </div>
        </div>
    </div>
}

export default DashBoardCard