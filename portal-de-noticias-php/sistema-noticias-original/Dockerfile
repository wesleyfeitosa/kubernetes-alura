FROM php:5.6-apache

# Fix broken stretch sources
RUN sed -i '/stretch-updates/d' /etc/apt/sources.list && \
    sed -i 's|http://deb.debian.org/debian|http://archive.debian.org/debian|g' /etc/apt/sources.list && \
    sed -i 's|http://security.debian.org/debian-security|http://archive.debian.org/debian-security|g' /etc/apt/sources.list && \
    echo 'Acquire::Check-Valid-Until "false";' > /etc/apt/apt.conf.d/99no-check-valid-until

# Environment variables from the original image
ENV PHP_VERSION=5.6.40 \
    PHP_URL=https://secure.php.net/get/php-5.6.40.tar.xz/from/this/mirror \
    PHP_SHA256=1369a51eee... \
    PHP_EXTRA_BUILD_DEPS=apache2-dev \
    PHP_EXTRA_CONFIGURE_ARGS=--with-apxs2 \
    PHP_CFLAGS="-fstack-protector-strong -fpic -fpie -O2" \
    PHP_CPPFLAGS="-fstack-protector-strong -fpic -fpie -O2" \
    PHP_LDFLAGS="-Wl,-O1 -Wl,--hash-style=both -pie" \
    GPG_KEYS=0BD78B5F9750C14C

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libiconv-hook-dev \
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev \
    libxrender1 \
    unzip \
    wget \
    libjpeg62-turbo \
    ghostscript \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    zip \
    pkg-config \
    build-essential \
    autoconf \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

# Enable Apache mods
RUN a2dismod mpm_event && a2enmod mpm_prefork && a2enmod rewrite

# Install PHP extensions
RUN docker-php-ext-install iconv \
    && docker-php-ext-install zip \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install mysqli

# Link shared libs manually (was done in original)
RUN ln -s /usr/lib/x86_64-linux-gnu/libjpeg.so /usr/lib/

# Create working directory
WORKDIR /var/www/html
RUN mkdir -p /var/www/html

# Set permissions
RUN chmod -R 777 /var/www/html

# Copy application files
COPY . /var/www/html

# Adjust uploads directory permissions (specific to this app)
RUN chmod og+rw /var/www/html/uploads

# Expose Apache port
EXPOSE 80

# Default command
CMD ["apache2-foreground"]
