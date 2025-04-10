# Cogni: Interactive Dementia Risk Assessment Tool

## Problem

Dementia is a complex condition with multiple risk factors and biomarkers that can influence diagnosis and prognosis. Healthcare providers face challenges in:

1. **Integrating multiple data points**: Age, cognitive test results, family history, and various biomarkers all contribute to dementia risk assessment.

2. **Understanding biomarker significance**: Different biomarkers have varying likelihood ratios for positive and negative results, making it difficult to interpret their combined impact.

3. **Communicating risk to patients**: Explaining how different factors contribute to overall dementia risk in a clear, visual way is challenging.

4. **Making evidence-based decisions**: Healthcare providers need a structured approach to incorporate the latest research on dementia biomarkers into their clinical decision-making.

## Solution

Cogni is an interactive flow diagram tool that visualizes the dementia risk assessment process. It:

1. **Visualizes the assessment flow**: Creates a clear, step-by-step visualization of how different inputs contribute to dementia risk assessment.

2. **Incorporates likelihood ratios**: Uses the latest research on biomarker likelihood ratios to calculate how positive or negative test results affect overall risk.

3. **Provides interactive elements**: Allows users to input patient data and see how it affects the assessment in real-time.

4. **Animates the assessment process**: Guides users through the flow with animated connections that highlight the relationships between different factors.

## Key Features

- **Interactive input nodes**: Users can enter patient age and cognitive test results directly in the diagram.

- **Dynamic risk calculation**: The system calculates dementia risk based on inputs and displays the result as a percentage.

- **Biomarker visualization**: Shows how different biomarkers (Plasma pTau217, Neurofilament Light, CSF AB 42:40 ratio, MRI Scan, Amyloid PET, Plasma GFAP) affect risk with their respective likelihood ratios.

- **Animated assessment flow**: When the "Calculate" button is pressed, the system animates the flow of information from inputs to results, making the assessment process clear and engaging.

- **Responsive layout**: The diagram can be viewed in both vertical and horizontal orientations to accommodate different screen sizes and preferences.

## Benefits

1. **For Healthcare Providers**:
   - Provides a structured approach to dementia risk assessment
   - Incorporates the latest research on biomarker likelihood ratios
   - Helps communicate risk factors to patients in a visual, understandable way
   - Supports evidence-based clinical decision-making

2. **For Patients and Families**:
   - Offers a clear visualization of how different factors contribute to dementia risk
   - Helps understand the significance of different biomarkers
   - Provides a more engaging way to learn about dementia risk factors

3. **For Researchers**:
   - Provides a framework for incorporating new biomarker research
   - Visualizes the relationships between different risk factors
   - Offers a platform for testing different risk assessment models

## Technical Implementation

Cogni is built using:
- Next.js for the frontend framework
- React Flow for the interactive diagram
- Dagre for automatic layout of the flow diagram
- TypeScript for type safety
- Tailwind CSS for styling

The system uses likelihood ratios from recent research to calculate how different biomarkers affect dementia risk. When a user enters patient data and clicks "Calculate," the system:

1. Processes the input data (age, cognitive test results, family history)
2. Calculates an initial dementia risk estimate
3. Shows how different biomarkers would affect this risk if tested
4. Animates the flow of information through the diagram

## Future Enhancements

- **Machine learning integration**: Incorporate machine learning models to improve risk prediction
- **Patient data storage**: Add secure storage for patient assessment history
- **Comparative analysis**: Allow comparison of risk profiles over time
- **Research updates**: Create a system for automatically updating likelihood ratios as new research becomes available
- **Mobile optimization**: Enhance the mobile experience for use in clinical settings

## Getting Started

To run the application locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
