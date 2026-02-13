# Office vs. Co-working Cost Calculator

A powerful, visually stunning web application designed to help businesses make data-driven decisions when choosing between traditional office space and co-working arrangements. Built with React, Vite, and Tailwind CSS.

![Office vs Co-working Calculator](https://img.shields.io/badge/React-19.2.0-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.18-38bdf8) ![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Overview

This calculator helps you compare the total cost of ownership between operating a traditional office versus using co-working spaces. It provides comprehensive cost analysis across different time horizons, considering operational expenses (OpEx), capital expenditures (CapEx), and one-time startup costs.

## ✨ Key Features

### 💰 **Comprehensive Cost Tracking**
- **Monthly OpEx**: Track recurring operational costs (rent, utilities, internet, cleaning, etc.)
- **Annual CapEx**: Capital expenditures that recur yearly (equipment upgrades, lease renewals)
- **One-Time Startup Costs**: Initial investment needed to get started (deposits, furniture, setup fees)

### 📊 **Smart Analytics**
- **Time Horizon Analysis**: Project costs over 1, 3, or 5 years
- **Cumulative Cost Visualization**: Interactive line charts showing cost trajectories
- **Break-even Analysis**: Identify when one option becomes more cost-effective
- **Real-time Calculations**: Instant updates as you modify inputs

### 🏗️ **Organized Categories**
- Create custom categories to organize your cost items
- Add unlimited line items under each category
- Collapsible categories for better organization
- Edit or remove any item with ease

### 🔄 **Copy Between Options**
- Duplicate entire categories from Office to Co-working (or vice versa)
- Copy individual line items between options
- Automatically creates "Copied Items" categories for orphaned items

### 🌍 **Multi-Currency Support**
- USD ($)
- EUR (€)
- GBP (£)
- PKR (₨)

### 🎨 **Visual Excellence**
- Modern gradient design with glassmorphism effects
- Smooth animations and transitions
- Fully responsive layout (mobile, tablet, desktop)
- Intuitive hover effects and visual feedback

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd cost-calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

### Production Build

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

3. **Access the app:**
   Navigate to `http://localhost:3000`

## 📖 How to Use

### 1. **Set Your Parameters**
   - Choose your time horizon (1, 3, or 5 years)
   - Select your currency
   - Set annual team growth rate (optional)

### 2. **Add Cost Categories**
   For both Traditional Office and Co-working Space:
   - Click "+ Add New Category" under each cost type (OpEx, CapEx, Startup)
   - Name your category (e.g., "Office Space", "Utilities", "Equipment")

### 3. **Add Line Items**
   - Under each category, add specific cost items
   - Enter the item name and cost
   - Press Enter or click "Add" to save

### 4. **Edit or Remove Items**
   - Hover over any item to reveal edit and delete buttons
   - Click the edit icon to modify
   - Click the trash icon to remove

### 5. **Copy Items**
   - Hover over a category heading to copy the entire category
   - Hover over a line item to copy just that item
   - Items are automatically added to the other option

### 6. **Analyze Results**
   - View total costs in the summary cards
   - Study the cumulative cost chart to see trends
   - Identify which option saves you money over your chosen time horizon

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **UI Components**: Lucide React (icons)
- **Charts**: Recharts 3.7.0
- **Backend**: Express.js (for production serving)

## 📁 Project Structure

```
cost-calculator/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with branding
│   │   ├── OfficeInputs.jsx    # Traditional office input form
│   │   ├── CoworkingInputs.jsx # Co-working input form
│   │   ├── ResultsSummary.jsx  # Cost comparison summary
│   │   ├── CostChart.jsx       # Cumulative cost chart
│   │   └── InputGroup.jsx      # Reusable input component
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # App entry point
│   └── index.css               # Tailwind imports
├── public/                     # Static assets
├── server.js                   # Express server for production
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🎯 Use Cases

### For Startups
- Compare costs when launching a new business
- Understand cash flow implications of different workspace options
- Plan for team growth and scaling

### For Growing Companies
- Evaluate when to transition from co-working to private office
- Analyze cost impact of expanding team size
- Budget for multi-year workspace commitments

### For Business Consultants
- Present data-driven recommendations to clients
- Demonstrate ROI of workspace decisions
- Create professional cost comparisons

## 🔮 Future Enhancements

- [ ] Export reports to PDF
- [ ] Save/load cost scenarios
- [ ] Team collaboration features
- [ ] More currencies
- [ ] Tax implications calculator
- [ ] Comparison with remote work costs

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 💡 Tips for Best Results

1. **Be Comprehensive**: Don't forget hidden costs like insurance, parking, or office supplies
2. **Research Actual Costs**: Use real quotes from co-working providers and commercial landlords
3. **Plan for Growth**: Factor in team expansion when setting growth rates
4. **Compare Apples to Apples**: Make sure both options include the same amenities
5. **Review Regularly**: Costs change over time - revisit your analysis periodically

---

**Built with ❤️ for smarter business decisions**
