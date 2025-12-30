/**
 * FormWithValidation Component
 * 
 * A comprehensive form that demonstrates:
 * - Multi-field form state management
 * - Real-time validation with error messages
 * - Password visibility toggle
 * - Form submission handling
 * - Accessibility best practices
 */

import { useState, useMemo } from 'react';

/**
 * Validation rules and patterns
 */
const VALIDATION = {
  name: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s'-]+$/,
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    minLength: 8,
    patterns: {
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      number: /[0-9]/,
      special: /[!@#$%^&*(),.?":{}|<>]/,
    },
  },
};

/**
 * Validate a single field
 * @param {string} field - Field name
 * @param {string} value - Field value
 * @returns {string} Error message or empty string
 */
const validateField = (field, value) => {
  if (!value.trim()) {
    return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
  }

  switch (field) {
    case 'name':
      if (value.length < VALIDATION.name.minLength) {
        return `Name must be at least ${VALIDATION.name.minLength} characters`;
      }
      if (value.length > VALIDATION.name.maxLength) {
        return `Name must be less than ${VALIDATION.name.maxLength} characters`;
      }
      if (!VALIDATION.name.pattern.test(value)) {
        return 'Name can only contain letters, spaces, hyphens, and apostrophes';
      }
      break;

    case 'email':
      if (!VALIDATION.email.pattern.test(value)) {
        return 'Please enter a valid email address';
      }
      break;

    case 'password':
      if (value.length < VALIDATION.password.minLength) {
        return `Password must be at least ${VALIDATION.password.minLength} characters`;
      }
      break;

    default:
      break;
  }

  return '';
};

/**
 * Check password strength
 * @param {string} password - Password value
 * @returns {Object} Strength info with score and checks
 */
const getPasswordStrength = (password) => {
  const checks = {
    length: password.length >= VALIDATION.password.minLength,
    uppercase: VALIDATION.password.patterns.uppercase.test(password),
    lowercase: VALIDATION.password.patterns.lowercase.test(password),
    number: VALIDATION.password.patterns.number.test(password),
    special: VALIDATION.password.patterns.special.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;
  
  let label = 'Weak';
  let color = 'bg-danger';
  
  if (score >= 4) {
    label = 'Strong';
    color = 'bg-success';
  } else if (score >= 3) {
    label = 'Medium';
    color = 'bg-warning';
  }

  return { checks, score, label, color };
};

/**
 * Main FormWithValidation Component
 */
const FormWithValidation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  /**
   * Memoized validation errors
   */
  const errors = useMemo(() => ({
    name: validateField('name', formData.name),
    email: validateField('email', formData.email),
    password: validateField('password', formData.password),
  }), [formData]);

  /**
   * Password strength calculation
   */
  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  /**
   * Check if form is valid
   */
  const isFormValid = useMemo(
    () => Object.values(errors).every((error) => error === ''),
    [errors]
  );

  /**
   * Handle input change
   */
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSubmitStatus(null);
  };

  /**
   * Handle input blur (mark field as touched)
   */
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, password: true });

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus('success');

    // Reset form after successful submission
    setTimeout(() => {
      setFormData({ name: '', email: '', password: '' });
      setTouched({ name: false, email: false, password: false });
      setSubmitStatus(null);
    }, 2000);
  };

  /**
   * Reset form to initial state
   */
  const handleReset = () => {
    setFormData({ name: '', email: '', password: '' });
    setTouched({ name: false, email: false, password: false });
    setSubmitStatus(null);
  };

  /**
   * Render field error message
   */
  const renderError = (field) => {
    if (!touched[field] || !errors[field]) return null;

    return (
      <p className="mt-1 text-sm text-danger flex items-center gap-1" role="alert">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {errors[field]}
      </p>
    );
  };

  return (
    <div className="bg-bg-primary rounded-xl border border-border p-8 max-w-md mx-auto">
      <div className="text-center mb-6">
        <span className="text-4xl mb-2 block">📋</span>
        <h2 className="text-xl font-semibold text-text-primary">Create Account</h2>
        <p className="text-sm text-text-muted mt-1">Fill in your details to register</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Full Name <span className="text-danger">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="John Doe"
            autoComplete="name"
            className={`w-full px-4 py-3 bg-bg-secondary border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
              touched.name && errors.name
                ? 'border-danger'
                : touched.name && !errors.name
                ? 'border-success'
                : 'border-border'
            }`}
            aria-invalid={touched.name && errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {renderError('name')}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Email Address <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="john@example.com"
            autoComplete="email"
            className={`w-full px-4 py-3 bg-bg-secondary border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
              touched.email && errors.email
                ? 'border-danger'
                : touched.email && !errors.email
                ? 'border-success'
                : 'border-border'
            }`}
            aria-invalid={touched.email && errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {renderError('email')}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-text-primary mb-2"
          >
            Password <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              placeholder="••••••••"
              autoComplete="new-password"
              className={`w-full px-4 py-3 pr-12 bg-bg-secondary border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 ${
                touched.password && errors.password
                  ? 'border-danger'
                  : touched.password && !errors.password
                  ? 'border-success'
                  : 'border-border'
              }`}
              aria-invalid={touched.password && errors.password ? 'true' : 'false'}
              aria-describedby="password-requirements"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          {renderError('password')}

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-3" id="password-requirements">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
                </div>
                <span className={`text-xs font-medium ${
                  passwordStrength.score >= 4 ? 'text-success' : 
                  passwordStrength.score >= 3 ? 'text-warning' : 'text-danger'
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-1 text-xs">
                {[
                  { key: 'length', label: '8+ characters' },
                  { key: 'uppercase', label: 'Uppercase' },
                  { key: 'lowercase', label: 'Lowercase' },
                  { key: 'number', label: 'Number' },
                  { key: 'special', label: 'Special char' },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className={`flex items-center gap-1 ${
                      passwordStrength.checks[key] ? 'text-success' : 'text-text-muted'
                    }`}
                  >
                    {passwordStrength.checks[key] ? (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    {label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Status */}
        {submitStatus === 'success' && (
          <div className="mb-4 p-3 bg-success-light text-success rounded-lg flex items-center gap-2" role="alert">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Account created successfully!
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 px-4 py-3 bg-bg-secondary text-text-primary font-medium rounded-lg border border-border hover:bg-bg-primary transition-all duration-200"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormWithValidation;