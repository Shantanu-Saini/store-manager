import axios from "axios";

export async function getInsights() {
    try {
        const response = await axios.get('/api/user/iteminfo');
        const items = response.data;

        // Get the current date
        const currentDate = new Date();

        // Calculate the first and last day of the previous month
        const firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        const lastDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

        // Filter the items based on the createdAt date being within last month
        const lastMonthSales = items.filter((item: any) => {
            const itemDate = new Date(item.createdAt);
            return itemDate >= firstDayOfLastMonth && itemDate <= lastDayOfLastMonth;
        });

        // Sum the totalSellingPrice of the filtered items
        const totalSales = lastMonthSales.reduce((acc: number, item: any) => acc + item.totalSellingPrice, 0);

        // Sum the total costPrice of the filtered items
        const totalBuying = lastMonthSales.reduce((acc: number, item: any) => acc + item.totalCostPrice, 0);

        // Find the item with the highest soldQuantity
        const mostSellingItem = lastMonthSales.reduce((maxItem: any, item: any) => {
            return item.soldQuantity > (maxItem?.soldQuantity || 0) ? item : maxItem;
        }, null);

        // Find the item with the highest totalProfit
        const mostProfitableItem = lastMonthSales.reduce((maxItem: any, item: any) => {
            return item.totalProfit > (maxItem?.totalProfit || 0) ? item : maxItem;
        }, null);

        return {
            totalSales,
            totalBuying,
            mostSellingItem: mostSellingItem ? mostSellingItem.name : null,
            mostProfitableItem: mostProfitableItem ? mostProfitableItem.name : null
        };
    } catch (error) {
        console.error("Error fetching totalSales:", error);
        return {
            totalSales: 0,
            totalBuying: 0,
            mostSellingItem: null,
            mostProfitableItem: null
        };
    }
}
