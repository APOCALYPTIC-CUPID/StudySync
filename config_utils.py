import json
import os
from pathlib import Path

def load_private_config():
    """
    Load private configuration from JSON file.
    This file should be listed in .gitignore and not pushed to GitHub.
    """
    try:
        base_dir = Path(__file__).resolve().parent
        config_path = base_dir / 'private_config.json'
        
        if not os.path.exists(config_path):
            print("Warning: private_config.json file not found")
            return {}
            
        with open(config_path, 'r') as file:
            config = json.load(file)
        return config
    except Exception as e:
        print(f"Error loading private configuration: {e}")
        return {}

def get_config_value(section, key, default=None):
    """
    Get a specific configuration value from the private config file.
    
    Args:
        section: The section of the config (e.g., 'email', 'cloudinary')
        key: The specific key to retrieve
        default: Default value if the key is not found
        
    Returns:
        The configuration value or the default value
    """
    config = load_private_config()
    
    try:
        return config.get(section, {}).get(key, default)
    except Exception:
        return default

def get_email_config():
    """Helper function to get all email configuration"""
    config = load_private_config()
    return config.get("email", {})

def get_cloudinary_config():
    """Helper function to get all Cloudinary configuration"""
    config = load_private_config()
    return config.get("cloudinary", {})

def get_django_secret_key():
    """Helper function to get Django secret key"""
    return get_config_value("django", "secret_key", 
                           "django-insecure-default-key-for-development-only")

# Example usage:
if __name__ == "__main__":
    # Don't actually run this in production, just for demonstration
    config = load_private_config()
    print(f"Email host: {get_config_value('email', 'host')}")
    print(f"Cloudinary cloud name: {get_config_value('cloudinary', 'cloud_name')}")
    
    # Getting all email config
    email_config = get_email_config()
    if email_config:
        print(f"Email user: {email_config.get('user')}") 