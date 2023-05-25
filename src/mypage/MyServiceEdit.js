import { RiUserSmileFill } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';

const MyServiceEdit = ({ data,
    handlerMouseOut,
    handlerMouseOver,
    isEditing,
    handlerClickDeleteEach }) => {
    return (
        <>
            <div className='my-service-box'>
                {data
                    &&
                    data.map((data, index) => (
                        <>
                            <div className='my-app-each-contain-delete' key={index}>
                                <div className='my-app-each'
                                    onMouseOver={() => handlerMouseOver(index)}
                                    onMouseOut={() => handlerMouseOut(index)}
                                >
                                    {
                                        data.hover
                                            ?
                                            <>
                                                <div className='my-app-hover-header'></div>
                                                <div className='my-app-hover-description'>
                                                    <p className='my-app-hover-imagename'>{data.imageName}</p>

                                                    <p className='my-app-hover-devname'>
                                                        <RiUserSmileFill className="my-app-hover-devicon" />
                                                        {data.userName}
                                                    </p>
                                                    <p className='my-app-hover-description-description'>{data.imageDescription}</p>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className='my-app-header'>
                                                    <div className='app-header-round'></div>
                                                    <div className='app-header-round'></div>
                                                    <div className='app-header-round'></div>
                                                </div>
                                                <img className='my-app-image' src={`http://${process.env.REACT_APP_IP}:${process.env.REACT_APP_PORT}/api/getimage/thumbnail/${data.thumbnailImage}`} />
                                                <div className='my-app-description'>
                                                    <p className='my-app-imagename'>{data.imageName}</p>
                                                    <p className='my-app-devname'>
                                                        <RiUserSmileFill className="my-app-devicon" />
                                                        {data.userName}
                                                    </p>
                                                    <p className='my-app-description-description'>{data.imageDescription}</p>
                                                </div>
                                            </>
                                    }
                                </div>
                                {
                                    isEditing
                                    &&
                                    <TiDelete type='button' title="삭제"
                                        className='my-app-delete-button-each'
                                        onClick={() => handlerClickDeleteEach(data.imageIdx)} />
                                }
                            </div>
                        </>
                    ))}
            </div>
        </>
    );
};

export default MyServiceEdit;