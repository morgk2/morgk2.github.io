import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AccountDeletion.css';
import alifiOrangeLogo from '../assets/logos/alifiorange.jpeg';

// Translation strings
const translations = {
  en: {
    title: "Request Account Deletion",
    subtitle: "We're sorry to see you go. To proceed with account deletion, please provide the following information.",
    emailLabel: "Email Address",
    nameLabel: "Full Name",
    emailPlaceholder: "Enter your email address",
    namePlaceholder: "Enter your full name",
    cancelButton: "Cancel",
    submitButton: "Submit Request",
    submittingButton: "Submitting...",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    nameRequired: "Name is required",
    successTitle: "Request Submitted Successfully",
    successMessage1: "We'll send you an email after 1 business day to confirm your account deletion.",
    successMessage2: "Please check your email for further instructions.",
    backHomeButton: "Back to Home",
    whatHappensNext: "What happens next?",
    step1: "We'll verify your identity using the provided information",
    step2: "You'll receive a confirmation email within 1 business day",
    step3: "Follow the instructions in the email to complete the deletion process",
    step4: "Your account and all associated data will be permanently deleted"
  },
  ar: {
    title: "طلب حذف الحساب",
    subtitle: "نحن آسفون لرؤيتك تغادر. للمتابعة مع حذف الحساب، يرجى تقديم المعلومات التالية.",
    emailLabel: "عنوان البريد الإلكتروني",
    nameLabel: "الاسم الكامل",
    emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
    namePlaceholder: "أدخل اسمك الكامل",
    cancelButton: "إلغاء",
    submitButton: "إرسال الطلب",
    submittingButton: "جاري الإرسال...",
    emailRequired: "البريد الإلكتروني مطلوب",
    emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صحيح",
    nameRequired: "الاسم مطلوب",
    successTitle: "تم إرسال الطلب بنجاح",
    successMessage1: "سنرسل لك بريدًا إلكترونيًا خلال يوم عمل واحد لتأكيد حذف حسابك.",
    successMessage2: "يرجى التحقق من بريدك الإلكتروني للحصول على تعليمات إضافية.",
    backHomeButton: "العودة إلى الصفحة الرئيسية",
    whatHappensNext: "ماذا يحدث بعد ذلك؟",
    step1: "سنتحقق من هويتك باستخدام المعلومات المقدمة",
    step2: "ستتلقى بريدًا إلكترونيًا للتأكيد خلال يوم عمل واحد",
    step3: "اتبع التعليمات في البريد الإلكتروني لإكمال عملية الحذف",
    step4: "سيتم حذف حسابك وجميع البيانات المرتبطة به نهائيًا"
  },
  fr: {
    title: "Demande de Suppression de Compte",
    subtitle: "Nous sommes désolés de vous voir partir. Pour procéder à la suppression du compte, veuillez fournir les informations suivantes.",
    emailLabel: "Adresse E-mail",
    nameLabel: "Nom Complet",
    emailPlaceholder: "Entrez votre adresse e-mail",
    namePlaceholder: "Entrez votre nom complet",
    cancelButton: "Annuler",
    submitButton: "Soumettre la Demande",
    submittingButton: "Soumission...",
    emailRequired: "L'e-mail est requis",
    emailInvalid: "Veuillez entrer une adresse e-mail valide",
    nameRequired: "Le nom est requis",
    successTitle: "Demande Soumise avec Succès",
    successMessage1: "Nous vous enverrons un e-mail dans un jour ouvrable pour confirmer la suppression de votre compte.",
    successMessage2: "Veuillez vérifier votre e-mail pour des instructions supplémentaires.",
    backHomeButton: "Retour à l'Accueil",
    whatHappensNext: "Que se passe-t-il ensuite ?",
    step1: "Nous vérifierons votre identité en utilisant les informations fournies",
    step2: "Vous recevrez un e-mail de confirmation dans un jour ouvrable",
    step3: "Suivez les instructions dans l'e-mail pour compléter le processus de suppression",
    step4: "Votre compte et toutes les données associées seront définitivement supprimés"
  }
};

const AccountDeletion = () => {
  const [form, setForm] = useState({ email: '', name: '' });
  const [formErrors, setFormErrors] = useState({ email: '', name: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState('en');

  const t = translations[language];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFormChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {};
    
    if (!form.email) {
      errors.email = t.emailRequired;
    } else if (!validateEmail(form.email)) {
      errors.email = t.emailInvalid;
    }
    
    if (!form.name.trim()) {
      errors.name = t.nameRequired;
    }
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };

  const isFormValid = () => {
    return form.email && 
           form.name.trim() && 
           validateEmail(form.email) &&
           Object.values(formErrors).every(error => !error);
  };

  if (isSubmitted) {
    return (
      <div className="account-deletion-page">
        <img src={alifiOrangeLogo} alt="Alifi" className="alifi-logo" />
        <div className="language-switcher">
          <button 
            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
          <button 
            className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
            onClick={() => setLanguage('ar')}
          >
            ع
          </button>
          <button 
            className={`lang-btn ${language === 'fr' ? 'active' : ''}`}
            onClick={() => setLanguage('fr')}
          >
            FR
          </button>
        </div>
        <div className="deletion-container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h1>{t.successTitle}</h1>
            <p>{t.successMessage1}</p>
            <p>{t.successMessage2}</p>
            <Link to="/" className="back-home-button">
              {t.backHomeButton}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-deletion-page">
      <img src={alifiOrangeLogo} alt="Alifi" className="alifi-logo" />
      <div className="language-switcher">
        <button 
          className={`lang-btn ${language === 'en' ? 'active' : ''}`}
          onClick={() => setLanguage('en')}
        >
          EN
        </button>
        <button 
          className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
          onClick={() => setLanguage('ar')}
        >
          ع
        </button>
        <button 
          className={`lang-btn ${language === 'fr' ? 'active' : ''}`}
          onClick={() => setLanguage('fr')}
        >
          FR
        </button>
      </div>
      <div className="deletion-container">
        <div className="deletion-header">
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        <form className="deletion-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t.emailLabel} *</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => handleFormChange('email', e.target.value)}
              className={formErrors.email ? 'error' : ''}
              placeholder={t.emailPlaceholder}
              required
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name">{t.nameLabel} *</label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={(e) => handleFormChange('name', e.target.value)}
              className={formErrors.name ? 'error' : ''}
              placeholder={t.namePlaceholder}
              required
            />
            {formErrors.name && <span className="error-message">{formErrors.name}</span>}
          </div>

          <div className="form-actions">
            <Link to="/" className="cancel-button">
              {t.cancelButton}
            </Link>
            <button 
              type="submit"
              className={`submit-button ${!isFormValid() || isSubmitting ? 'disabled' : ''}`}
              disabled={!isFormValid() || isSubmitting}
            >
              {isSubmitting ? t.submittingButton : t.submitButton}
            </button>
          </div>
        </form>

        <div className="deletion-info">
          <h3>{t.whatHappensNext}</h3>
          <ul>
            <li>{t.step1}</li>
            <li>{t.step2}</li>
            <li>{t.step3}</li>
            <li>{t.step4}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountDeletion;
