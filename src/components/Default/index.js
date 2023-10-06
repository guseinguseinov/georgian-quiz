import CustomFooter from "../CustomFooter/CustomFooter";
import CustomHeader from "../CustomHeader/CustomHeader";

function DefaultComponent({ children }) {

    return (
        <div style={{ height: "100vh" }}>
            <CustomHeader />
            {children}
            <CustomFooter />
        </div>
    );
}

export default DefaultComponent;