import { Button, Grid, Container } from "@mui/material";
import './style.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export const Submenu = () => {
    const arr = [
        {
            name: "Gấu Bông Teddy Cao cấp",
            path: "gau-nhoi-bong-cao-cap",
            child: [
                {
                    nameChild: "Gấu Bông Teddy To",
                    itemChild: [
                        { nameChildItem: "Gấu Teddy 1m5-1m6-1m7-2m", path: "gau-1m" },
                        { nameChildItem: "Gấu Teddy 80cm-1m-1m1-1m2-1m4", path: "gau-2m" },
                        { nameChildItem: "Gấu Teddy Nhỏ 20cm-70cm", path: "gau-2m" },
                        { nameChildItem: "Gấu Teddy Khổng Lồ 2m-3m", path: "gau-2m" },
                    ]
                }
            ]
        },
        {
            name: "Bộ sưu tập",
            path: "gau-nhoi-bong-gia-re",
            child: [
                {
                    nameChild: "GẤU BÔNG BẢN QUYỀN",
                    itemChild: [
                        { nameChildItem: "Gấu Bông Metoo", path: "gau-1m" },
                        { nameChildItem: "Pikachu & Pokemon", path: "gau-2m" },
                        { nameChildItem: "Warner Bros", path: "gau-2m" },
                    ]
                },
                {
                    nameChild: "GẤU BÔNG ĐỘC QUYỀN",
                    itemChild: [
                        { nameChildItem: "Gấu Bông Mihi", path: "gau-3m" },
                        { nameChildItem: "Gấu Bông Ghi Âm", path: "gau-4m" },
                    ]
                },
                {
                    nameChild: "BST Ngày Lễ",
                    itemChild: [
                        { nameChildItem: "BST Giáng Sinh Rực Rỡ", path: "gau-3m" },
                        { nameChildItem: "BST Gấu Bông Giáng Sinh", path: "gau-4m" },
                        { nameChildItem: "BST Gấu Bông Valentine", path: "gau-4m" },
                        { nameChildItem: "BST Hoa Sáp Tặng Nàng", path: "gau-4m" },
                        { nameChildItem: "BST Hoa Bông Không Tàn", path: "gau-4m" },
                    ]
                },
                {
                    nameChild: "Thú Bông",
                    itemChild: [
                        { nameChildItem: "BST Gấu Bông Cho Bé", path: "gau-3m" },
                        { nameChildItem: "BST Gấu Bông Cute", path: "gau-4m" },
                        { nameChildItem: "BST Gấu Bông Ôm Bình Sữa", path: "gau-4m" },
                        { nameChildItem: "BST Gấu Bông Giá Rẻ", path: "gau-4m" },
                        { nameChildItem: "BST Thú Bông Nhỏ", path: "gau-4m" },
                    ]
                },
            ]
        },
    ];

    return (
        <Grid container className="submenu-page">
            <Container className="wrap-submenu-panel">
                <Button className="name-submenu">Trang chủ</Button>
                {arr.map((item, index) => (
                    <div className="submenu-panel" key={index}>
                        <Button className="name-submenu">{item.name}<KeyboardArrowDownIcon style={{marginBottom:'5px'}}/></Button>
                        <div className="child-menu-panel">
                            {item.child.map((child, keyy) => (
                                <div className="col-item-menu" key={keyy}>
                                   <div className="name-item">
                                        {child.nameChild}                 
                                   </div>
                                    {child.itemChild.map((childItem, keyz) => (
                                        <div className="name-child-item" key={keyz}>
                                            {childItem.nameChildItem}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Container>
        </Grid>
    );
};