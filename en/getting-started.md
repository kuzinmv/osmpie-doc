# OSMPIE Editor Tutorial: Comprehensive Getting Started Guide

## 1. Initiating Your OSMPIE Editor Session

### Initial Interface Overview
![OSMPIE Start Screen](./img/screen1.png)

To commence your work with OSMPIE, authentication through OpenStreetMap is required—a process that is rapid, secure, and eliminates the necessity for creating separate account credentials.

### Authentication Procedures

**How to Authenticate:**
Click the **"Please, login in OSM to start"** button located at the top of the screen interface.

**For Existing OpenStreetMap Account Holders:**
1. Enter your established login credentials and password
2. Authorize access to basic profile data (the service requests only publicly available information)

**For New Users Without OSM Accounts:**
1. Select "Register" in the authentication window
2. Complete the registration form with required information: email address, username, and secure password
3. Verify your email address through the confirmation message
4. Return to OSMPIE for initial login

### Why OpenStreetMap Authentication?

**Unified Account System:** Eliminates the need to remember additional login credentials across multiple mapping platforms.

**Enhanced Security:** Authentication occurs through the official OSM website infrastructure, ensuring that OSMPIE never accesses or stores your password credentials.

Upon successful authentication, you will be automatically redirected to the main screen interface and may proceed with your mapping activities.

### Accessibility Solutions for Russian Federation Users

**If OSM Access is Restricted/Blocked in RF:**

1. Follow the comprehensive instructions available at [https://t.me/ruosm/850833](https://t.me/ruosm/850833)
2. Virtual Private Network (VPN) solutions typically provide effective access restoration
3. Firefox-specific fixes offer the simplest implementation and demonstrate excellent reliability

---

## 2. Location Selection and Intersection Targeting

### Geographic Navigation and Search Functionality

Utilize the map zoom controls to navigate to your desired intersection for editing purposes. The left-side interface includes a search button that opens a location query form, accepting keyword inputs such as "Nevsky Prospekt," "Tyumen," or other geographic identifiers.

![Location Selection Interface](./img/screen2.png)

### Area Loading Methods

**Automatic Loading:** When sufficient zoom level is achieved, the **"Load current view"** button becomes activated for immediate area loading.

**Precision Selection:** Alternatively, utilize the **"Draw to load"** function to manually delineate your target area with enhanced precision.

OSMPIE executes queries to the [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API) for comprehensive data retrieval and subsequently opens the primary editing interface.

---

## 3. OSMPIE Editor: Core Functionality and Interface

### Dual-Panel Interface Architecture

The primary editor window employs a sophisticated dual-panel design architecture:

**Left Panel:** Provides comprehensive functionality for adding, repositioning, and modifying road objects including ways, nodes, and relations.

**Right Panel:** Features the OSMPIE rendering engine that generates detailed road models reflecting all user-implemented modifications.

**Critical Note:** Rendering processes are not automatic. To update the right panel visualization, users must activate the **"Refresh view + Save changes"** button located in the upper-left section of the right panel interface.

![OSMPIE Editor Interface](./img/screen3.png)

### Encouraging Experimental Workflow

**Bold Experimentation Recommended:**
Confidently experiment with various modifications including:
- Relocating node positions
- Removing existing roadway elements
- Adding new road segments
- Observing resultant changes

### Safe Testing Environment

**Risk-Free Editing:** All modifications occur within a secure testing environment. Every action (individual steps or complete sessions) can be reversed without consequence. Data modifications are processed locally within your browser environment and cannot affect the OpenStreetMap database.

**Local Data Processing:** All changes remain within your browser's local storage, providing complete safety for experimental editing approaches.

![Experimental Editing Interface](./img/screen3a.png)

### Professional Workflow Integration

The OSMPIE editor serves as both a learning platform for new cartographers and a professional tool for experienced mappers seeking enhanced visualization capabilities. The dual-panel approach facilitates immediate feedback on tagging decisions while maintaining full compatibility with standard OSM editing workflows.

**Key Advantages:**
- **Real-time Visualization:** Immediate visual feedback on tagging and geometric changes
- **Non-destructive Editing:** Complete revision history with full rollback capabilities  
- **Professional Integration:** Seamless compatibility with existing OSM editor ecosystems
- **Educational Value:** Enhanced understanding of road topology through visual representation

This comprehensive interface design enables both novice and expert users to achieve professional-quality results while maintaining the flexibility to experiment and learn through hands-on interaction with complex intersection modeling scenarios.
