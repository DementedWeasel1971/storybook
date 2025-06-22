---
template: agents-autogluon.md
version: {{agentsVersion}}
lastUpdated: {{date}}
sourceTemplate: templates/technology-specific/autogluon/AGENTS.autogluon.md
generatedBy: executor-crew
technology: AutoGluon
generationTriggers: 
  - CLAUDE.md architecture changes
  - AutoGluon ML implementation requirements updates
chainedGeneration:
  - FRS.md (from AGENTS.md implementation)
---

# AGENTS.md: AI Agent Constitution for AutoGluon ML Application Development

**Version**: {{agentsVersion}}  
**Generated from**: CLAUDE.md architectural specification  
**Date**: {{date}}  
**Technology**: AutoGluon (AutoML Framework)

This document provides the **official guidelines and mandatory protocols** for any AI agent contributing to this AutoGluon machine learning project. **You MUST adhere to all instructions herein.**

## Project Overview

{{autogluonProjectOverview}}

**Crucially, all AI agents MUST implement the AutoGluon ML architecture defined in `CLAUDE.md` and document technical specifications in `docs/FRS.md` as implementation proceeds.**

## AutoGluon Implementation Requirements

Based on the architecture defined in CLAUDE.md, the following AutoGluon implementation requirements are mandatory:

{{autogluonImplementationRequirements}}

### AutoGluon Framework Standards

1. **Project Structure**
   ```
   ml_project/
   ├── src/
   │   ├── __init__.py
   │   ├── data/                 # Data processing modules
   │   │   ├── __init__.py
   │   │   ├── loader.py
   │   │   ├── preprocessor.py
   │   │   └── validator.py
   │   ├── models/               # Model management
   │   │   ├── __init__.py
   │   │   ├── predictor.py
   │   │   ├── ensemble.py
   │   │   └── custom_models.py
   │   ├── evaluation/           # Model evaluation
   │   │   ├── __init__.py
   │   │   ├── metrics.py
   │   │   └── reports.py
   │   ├── deployment/           # Model deployment
   │   │   ├── __init__.py
   │   │   ├── api.py
   │   │   └── batch_predict.py
   │   └── utils/                # Utility functions
   │       ├── __init__.py
   │       ├── config.py
   │       └── logging.py
   ├── data/
   │   ├── raw/                  # Raw data files
   │   ├── processed/            # Processed data
   │   ├── features/             # Feature engineered data
   │   └── models/               # Saved models
   ├── notebooks/                # Jupyter notebooks
   │   ├── 01_data_exploration.ipynb
   │   ├── 02_feature_engineering.ipynb
   │   └── 03_model_training.ipynb
   ├── tests/
   ├── configs/                  # Configuration files
   │   ├── training.yaml
   │   ├── deployment.yaml
   │   └── data.yaml
   ├── requirements.txt
   └── setup.py
   ```

2. **AutoGluon Core Modules**
   - AutoGluon Tabular (structured data)
   - AutoGluon MultiModal (text, images, tabular)
   - AutoGluon TimeSeries (time series forecasting)
   - AutoGluon Custom (custom model integration)

### Data Management Standards

{{dataManagementStandards}}

1. **Data Pipeline Implementation**
   ```python
   from autogluon.tabular import TabularDataset, TabularPredictor
   import pandas as pd
   from typing import Tuple, Dict, Any, Optional
   
   class DataProcessor:
       """Standardized data processing for AutoGluon."""
       
       def __init__(self, config: Dict[str, Any]):
           self.config = config
           self.label_column = config['label_column']
           self.problem_type = config.get('problem_type', 'auto')
       
       def load_data(self, file_path: str) -> TabularDataset:
           """Load data with validation."""
           try:
               data = TabularDataset(file_path)
               self._validate_data(data)
               return data
           except Exception as e:
               raise DataLoadError(f"Failed to load data: {e}")
       
       def split_data(
           self, 
           data: TabularDataset, 
           test_size: float = 0.2
       ) -> Tuple[TabularDataset, TabularDataset]:
           """Split data into train and test sets."""
           return data.sample(frac=1-test_size), data.drop(data.sample(frac=1-test_size).index)
       
       def _validate_data(self, data: TabularDataset) -> None:
           """Validate data quality and structure."""
           if self.label_column not in data.columns:
               raise ValueError(f"Label column '{self.label_column}' not found")
           
           if data[self.label_column].isnull().all():
               raise ValueError("Label column contains only null values")
           
           if len(data) < 10:
               raise ValueError("Dataset too small for training")
   ```

2. **Feature Engineering Pipeline**
   ```python
   class FeatureEngineering:
       """AutoGluon-compatible feature engineering."""
       
       def __init__(self, config: Dict[str, Any]):
           self.config = config
           self.numerical_features = config.get('numerical_features', [])
           self.categorical_features = config.get('categorical_features', [])
       
       def engineer_features(self, data: TabularDataset) -> TabularDataset:
           """Apply feature engineering transformations."""
           # AutoGluon handles most preprocessing automatically
           # Custom feature engineering can be applied here
           
           # Handle missing values
           if self.config.get('fill_missing', True):
               data = self._handle_missing_values(data)
           
           # Create interaction features
           if self.config.get('create_interactions', False):
               data = self._create_interactions(data)
           
           # Time-based features for datetime columns
           data = self._extract_datetime_features(data)
           
           return data
   ```

### Model Training Standards

{{modelTrainingStandards}}

1. **AutoGluon Predictor Configuration**
   ```python
   class ModelTrainer:
       """Standardized AutoGluon model training."""
       
       def __init__(self, config: Dict[str, Any]):
           self.config = config
           self.predictor = None
       
       def train(
           self, 
           train_data: TabularDataset, 
           label: str,
           time_limit: int = 3600,
           quality: str = 'good_quality'
       ) -> TabularPredictor:
           """Train AutoGluon model with best practices."""
           
           # Configure hyperparameters
           hyperparameters = self._get_hyperparameters()
           
           # Set up predictor
           self.predictor = TabularPredictor(
               label=label,
               problem_type=self.config.get('problem_type', 'auto'),
               eval_metric=self.config.get('eval_metric', 'auto'),
               path=self.config.get('model_path', './models/'),
               verbosity=self.config.get('verbosity', 2)
           )
           
           # Train with time budget
           self.predictor.fit(
               train_data,
               time_limit=time_limit,
               presets=quality,
               hyperparameters=hyperparameters,
               num_bag_folds=self.config.get('num_bag_folds', 8),
               num_bag_sets=self.config.get('num_bag_sets', 1),
               num_stack_levels=self.config.get('num_stack_levels', 1),
               auto_stack=self.config.get('auto_stack', True)
           )
           
           return self.predictor
       
       def _get_hyperparameters(self) -> Dict[str, Any]:
           """Get model-specific hyperparameters."""
           return {
               'GBM': {
                   'num_boost_round': 10000,
                   'learning_rate': 0.05,
                   'num_leaves': 31,
                   'feature_fraction': 0.8,
                   'min_data_in_leaf': 5
               },
               'CAT': {
                   'iterations': 10000,
                   'learning_rate': 0.05,
                   'depth': 6,
                   'l2_leaf_reg': 3,
                   'bootstrap_type': 'Bernoulli',
                   'subsample': 0.8
               },
               'XGB': {
                   'n_estimators': 10000,
                   'learning_rate': 0.05,
                   'max_depth': 6,
                   'subsample': 0.8,
                   'colsample_bytree': 0.8
               },
               'RF': {
                   'n_estimators': 300,
                   'max_depth': None,
                   'max_features': 'auto',
                   'min_samples_split': 2,
                   'min_samples_leaf': 1
               },
               'NN_TORCH': {
                   'num_epochs': 200,
                   'learning_rate': 0.001,
                   'weight_decay': 1e-4,
                   'dropout_prob': 0.1
               }
           }
   ```

### Model Evaluation Standards

{{modelEvaluationStandards}}

1. **Comprehensive Evaluation Framework**
   ```python
   from autogluon.core.metrics import Scorer
   import numpy as np
   import matplotlib.pyplot as plt
   import seaborn as sns
   from sklearn.metrics import confusion_matrix, classification_report
   
   class ModelEvaluator:
       """Comprehensive model evaluation for AutoGluon."""
       
       def __init__(self, predictor: TabularPredictor):
           self.predictor = predictor
           self.problem_type = predictor.problem_type
       
       def evaluate(
           self, 
           test_data: TabularDataset,
           label: str
       ) -> Dict[str, Any]:
           """Comprehensive model evaluation."""
           
           # Get predictions
           predictions = self.predictor.predict(test_data.drop(columns=[label]))
           probabilities = None
           
           if self.problem_type in ['binary', 'multiclass']:
               probabilities = self.predictor.predict_proba(test_data.drop(columns=[label]))
           
           # Calculate metrics
           metrics = self._calculate_metrics(
               test_data[label], 
               predictions, 
               probabilities
           )
           
           # Generate evaluation report
           report = {
               'metrics': metrics,
               'model_summary': self._get_model_summary(),
               'feature_importance': self._get_feature_importance(),
               'leaderboard': self.predictor.leaderboard(test_data, silent=True)
           }
           
           # Create visualizations
           self._create_evaluation_plots(
               test_data[label], 
               predictions, 
               probabilities
           )
           
           return report
       
       def _calculate_metrics(
           self, 
           y_true, 
           y_pred, 
           y_prob=None
       ) -> Dict[str, float]:
           """Calculate comprehensive metrics."""
           metrics = {}
           
           if self.problem_type == 'regression':
               from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
               metrics.update({
                   'rmse': np.sqrt(mean_squared_error(y_true, y_pred)),
                   'mae': mean_absolute_error(y_true, y_pred),
                   'r2': r2_score(y_true, y_pred)
               })
           
           elif self.problem_type in ['binary', 'multiclass']:
               from sklearn.metrics import accuracy_score, precision_recall_fscore_support
               from sklearn.metrics import roc_auc_score, log_loss
               
               accuracy = accuracy_score(y_true, y_pred)
               precision, recall, f1, _ = precision_recall_fscore_support(
                   y_true, y_pred, average='weighted'
               )
               
               metrics.update({
                   'accuracy': accuracy,
                   'precision': precision,
                   'recall': recall,
                   'f1': f1
               })
               
               if y_prob is not None:
                   try:
                       if self.problem_type == 'binary':
                           auc = roc_auc_score(y_true, y_prob.iloc[:, 1])
                       else:
                           auc = roc_auc_score(y_true, y_prob, multi_class='ovr')
                       metrics['auc'] = auc
                   except:
                       pass
                   
                   try:
                       logloss = log_loss(y_true, y_prob)
                       metrics['log_loss'] = logloss
                   except:
                       pass
           
           return metrics
   ```

### Deployment Standards

{{deploymentStandards}}

1. **Model Serving API**
   ```python
   from flask import Flask, request, jsonify
   from autogluon.tabular import TabularPredictor
   import pandas as pd
   import joblib
   from typing import Dict, Any, List
   
   class ModelServer:
       """Production model serving with AutoGluon."""
       
       def __init__(self, model_path: str):
           self.predictor = TabularPredictor.load(model_path)
           self.app = Flask(__name__)
           self._setup_routes()
       
       def _setup_routes(self):
           """Set up API routes."""
           
           @self.app.route('/health', methods=['GET'])
           def health_check():
               return jsonify({'status': 'healthy', 'model_loaded': True})
           
           @self.app.route('/predict', methods=['POST'])
           def predict():
               try:
                   data = request.json
                   
                   # Validate input
                   if not data or 'instances' not in data:
                       return jsonify({'error': 'Invalid input format'}), 400
                   
                   # Convert to DataFrame
                   df = pd.DataFrame(data['instances'])
                   
                   # Make predictions
                   predictions = self.predictor.predict(df)
                   probabilities = None
                   
                   if self.predictor.problem_type in ['binary', 'multiclass']:
                       probabilities = self.predictor.predict_proba(df)
                   
                   # Format response
                   response = {
                       'predictions': predictions.tolist(),
                       'model_info': {
                           'problem_type': self.predictor.problem_type,
                           'eval_metric': self.predictor.eval_metric
                       }
                   }
                   
                   if probabilities is not None:
                       response['probabilities'] = probabilities.values.tolist()
                       response['classes'] = probabilities.columns.tolist()
                   
                   return jsonify(response)
                   
               except Exception as e:
                   return jsonify({'error': str(e)}), 500
           
           @self.app.route('/model/info', methods=['GET'])
           def model_info():
               leaderboard = self.predictor.leaderboard(silent=True)
               return jsonify({
                   'problem_type': self.predictor.problem_type,
                   'eval_metric': self.predictor.eval_metric,
                   'num_models': len(leaderboard),
                   'best_model': leaderboard.iloc[0]['model'],
                   'best_score': leaderboard.iloc[0]['score_val']
               })
       
       def run(self, host='0.0.0.0', port=5000, debug=False):
           """Run the model server."""
           self.app.run(host=host, port=port, debug=debug)
   ```

2. **Batch Prediction Pipeline**
   ```python
   class BatchPredictor:
       """Batch prediction processing."""
       
       def __init__(self, model_path: str, batch_size: int = 10000):
           self.predictor = TabularPredictor.load(model_path)
           self.batch_size = batch_size
       
       def predict_batch(
           self, 
           input_path: str, 
           output_path: str,
           chunk_size: int = None
       ) -> None:
           """Process large datasets in batches."""
           chunk_size = chunk_size or self.batch_size
           
           # Process data in chunks
           for i, chunk in enumerate(pd.read_csv(input_path, chunksize=chunk_size)):
               predictions = self.predictor.predict(chunk)
               
               # Add predictions to chunk
               chunk['prediction'] = predictions
               
               if self.predictor.problem_type in ['binary', 'multiclass']:
                   probabilities = self.predictor.predict_proba(chunk.drop(columns=['prediction']))
                   for col in probabilities.columns:
                       chunk[f'prob_{col}'] = probabilities[col]
               
               # Save chunk
               mode = 'w' if i == 0 else 'a'
               header = i == 0
               chunk.to_csv(output_path, mode=mode, header=header, index=False)
   ```

### Monitoring and MLOps Standards

{{monitoringMLOpsStandards}}

1. **Model Monitoring**
   ```python
   import mlflow
   import mlflow.autogluon
   from datetime import datetime
   
   class ModelMonitor:
       """Monitor model performance in production."""
       
       def __init__(self, model_name: str, model_version: str):
           self.model_name = model_name
           self.model_version = model_version
           mlflow.set_tracking_uri("sqlite:///mlflow.db")
       
       def log_training_run(
           self, 
           predictor: TabularPredictor,
           train_data: TabularDataset,
           test_data: TabularDataset,
           config: Dict[str, Any]
       ) -> None:
           """Log training run to MLflow."""
           
           with mlflow.start_run(run_name=f"{self.model_name}_{datetime.now().isoformat()}"):
               # Log parameters
               mlflow.log_params(config)
               
               # Log model
               mlflow.autogluon.log_model(predictor, "model")
               
               # Log metrics
               leaderboard = predictor.leaderboard(test_data, silent=True)
               best_score = leaderboard.iloc[0]['score_val']
               mlflow.log_metric("best_model_score", best_score)
               
               # Log feature importance
               feature_importance = predictor.feature_importance(test_data)
               self._log_feature_importance(feature_importance)
       
       def monitor_drift(
           self, 
           reference_data: pd.DataFrame,
           current_data: pd.DataFrame
       ) -> Dict[str, float]:
           """Monitor data drift."""
           from scipy.stats import ks_2samp
           
           drift_scores = {}
           
           for column in reference_data.columns:
               if pd.api.types.is_numeric_dtype(reference_data[column]):
                   # KS test for numerical features
                   statistic, p_value = ks_2samp(
                       reference_data[column].dropna(),
                       current_data[column].dropna()
                   )
                   drift_scores[column] = {'ks_statistic': statistic, 'p_value': p_value}
               else:
                   # Chi-square test for categorical features
                   ref_dist = reference_data[column].value_counts(normalize=True)
                   curr_dist = current_data[column].value_counts(normalize=True)
                   
                   # Calculate distribution difference
                   all_categories = set(ref_dist.index) | set(curr_dist.index)
                   ref_probs = [ref_dist.get(cat, 0) for cat in all_categories]
                   curr_probs = [curr_dist.get(cat, 0) for cat in all_categories]
                   
                   # Jensen-Shannon divergence
                   js_divergence = self._jensen_shannon_divergence(ref_probs, curr_probs)
                   drift_scores[column] = {'js_divergence': js_divergence}
           
           return drift_scores
   ```

### Configuration Management

{{configurationManagement}}

```yaml
# configs/training.yaml
model:
  problem_type: "auto"  # auto, binary, multiclass, regression
  eval_metric: "auto"   # auto, accuracy, roc_auc, rmse, etc.
  time_limit: 3600      # seconds
  quality: "good_quality"  # fast_baseline, good_quality, best_quality
  
data:
  label_column: "target"
  train_path: "data/processed/train.csv"
  test_path: "data/processed/test.csv"
  validation_split: 0.2
  
preprocessing:
  fill_missing: true
  create_interactions: false
  scale_features: false  # AutoGluon handles this
  
hyperparameters:
  GBM:
    num_boost_round: 10000
    learning_rate: 0.05
  CAT:
    iterations: 10000
    learning_rate: 0.05
  XGB:
    n_estimators: 10000
    learning_rate: 0.05
  
ensemble:
  num_bag_folds: 8
  num_bag_sets: 1
  num_stack_levels: 1
  auto_stack: true

logging:
  level: "INFO"
  format: "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
  mlflow_tracking_uri: "sqlite:///mlflow.db"
```

### Testing Requirements

{{testingRequirements}}

1. **Model Testing Framework**
   ```python
   import pytest
   import pandas as pd
   from autogluon.tabular import TabularDataset, TabularPredictor
   
   class TestAutoGluonPipeline:
       """Test AutoGluon ML pipeline."""
       
       @pytest.fixture
       def sample_data(self):
           """Create sample dataset for testing."""
           np.random.seed(42)
           n_samples = 1000
           
           data = pd.DataFrame({
               'feature1': np.random.normal(0, 1, n_samples),
               'feature2': np.random.normal(0, 1, n_samples),
               'feature3': np.random.choice(['A', 'B', 'C'], n_samples),
               'target': np.random.choice([0, 1], n_samples)
           })
           
           return TabularDataset(data)
       
       def test_data_loading(self, sample_data):
           """Test data loading functionality."""
           assert isinstance(sample_data, TabularDataset)
           assert len(sample_data) == 1000
           assert 'target' in sample_data.columns
       
       def test_model_training(self, sample_data):
           """Test model training."""
           predictor = TabularPredictor(
               label='target',
               path='./test_model/',
               verbosity=0
           )
           
           predictor.fit(
               sample_data,
               time_limit=60,  # Quick training for testing
               presets='fast_baseline'
           )
           
           assert predictor.class_labels is not None
           assert len(predictor.get_model_names()) > 0
       
       def test_prediction(self, sample_data):
           """Test model prediction."""
           train_data = sample_data.sample(frac=0.8)
           test_data = sample_data.drop(train_data.index)
           
           predictor = TabularPredictor(
               label='target',
               path='./test_model/',
               verbosity=0
           )
           
           predictor.fit(train_data, time_limit=60, presets='fast_baseline')
           
           predictions = predictor.predict(test_data.drop(columns=['target']))
           probabilities = predictor.predict_proba(test_data.drop(columns=['target']))
           
           assert len(predictions) == len(test_data)
           assert len(probabilities) == len(test_data)
           assert all(pred in [0, 1] for pred in predictions)
   ```

## Error Handling and Logging

{{errorHandlingLogging}}

```python
import logging
import traceback
from typing import Any, Dict
from functools import wraps

class AutoGluonLogger:
    """Centralized logging for AutoGluon projects."""
    
    def __init__(self, name: str, level: str = "INFO"):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(getattr(logging, level))
        
        if not self.logger.handlers:
            # Console handler
            console_handler = logging.StreamHandler()
            console_formatter = logging.Formatter(
                '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            )
            console_handler.setFormatter(console_formatter)
            self.logger.addHandler(console_handler)
            
            # File handler
            file_handler = logging.FileHandler('autogluon_app.log')
            file_handler.setFormatter(console_formatter)
            self.logger.addHandler(file_handler)
    
    def log_experiment(self, config: Dict[str, Any], metrics: Dict[str, float]):
        """Log experiment details."""
        self.logger.info(f"Experiment Config: {config}")
        self.logger.info(f"Experiment Metrics: {metrics}")

def handle_exceptions(f):
    """Decorator for exception handling."""
    @wraps(f)
    def wrapper(*args, **kwargs):
        try:
            return f(*args, **kwargs)
        except Exception as e:
            logger = logging.getLogger(__name__)
            logger.error(f"Error in {f.__name__}: {str(e)}")
            logger.error(f"Traceback: {traceback.format_exc()}")
            raise
    return wrapper
```

## Agent Collaboration Requirements

All agents working on this AutoGluon project must:

1. **Follow AutoGluon Best Practices**
   - Use TabularPredictor for structured data
   - Implement proper data validation
   - Configure appropriate time budgets
   - Use ensemble methods effectively

2. **Implement Comprehensive Evaluation**
   - Multiple metrics for model assessment
   - Cross-validation and holdout testing
   - Feature importance analysis
   - Model interpretability

3. **Ensure Production Readiness**
   - Model versioning and tracking
   - API endpoints for serving
   - Monitoring and alerting
   - Batch processing capabilities

4. **Maintain Code Quality**
   - Type hints and documentation
   - Comprehensive testing
   - Error handling and logging
   - Configuration management

## Quality Gates

Before any code is merged:

1. All tests must pass (>90% coverage)
2. Model performance meets baseline requirements
3. Data validation checks pass
4. API endpoints tested and documented
5. Monitoring and logging implemented
6. Configuration externalized
7. Documentation updated

## Performance Requirements

1. **Training Performance**
   - Efficient memory usage
   - Parallel processing utilization
   - Time budget optimization
   - Resource monitoring

2. **Inference Performance**
   - Fast prediction times (<100ms for single predictions)
   - Efficient batch processing
   - Model compression when needed
   - Caching strategies

3. **Scalability**
   - Horizontal scaling capability
   - Containerized deployment
   - Load balancing support
   - Resource elasticity

---

**Remember**: This document is your contract for AutoGluon development. Violating these guidelines may result in rejected contributions. Always refer to CLAUDE.md for architectural decisions and update FRS.md with implementation details.