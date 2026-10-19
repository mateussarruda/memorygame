export default function Card({text, onClick, dataId, image}) {
    return (
        <>
            <div className="card" onClick={onClick}>{text}
                <img src={image} alt="" data-id={dataId} />
            </div>
        </>
    );
}