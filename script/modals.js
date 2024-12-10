export const modalHTML = 
`
<div class="modal-overlayer">
      <div class="modal-fee">
          <div class="login-form">
              <div class="back-arrow">
                <span class="close close-js">&times;</span>
              </div>
              <h1 class="heading-name"></h1>
              <div class="container">
                  <div class="main">
                      <div class="content">
                          <h2>Edit Fee</h2>
                          <input type="text" class="input" id="tricycle" placeholder="Tricycle Fee" oninput="this.value = 'NGN ' + this.value.replace(/[^0-9.]/g, '')">
                          <input type="text" class="input" id="car" placeholder="Car Fee" oninput="this.value = 'NGN ' + this.value.replace(/[^0-9.]/g, '')">
                          <input type="text" class="input" id="small-truck" placeholder="Small-Truck Fee" oninput="this.value = 'NGN ' + this.value.replace(/[^0-9.]/g, '')">
                          <input type="text" class="input" id="big-truck" placeholder="Big-Truck Fee" oninput="this.value = 'NGN ' + this.value.replace(/[^0-9.]/g, '')">
                          <input type="text" class="input" id="ticket-loss" placeholder="Ticket-Loss Fee" oninput="this.value = 'NGN ' + this.value.replace(/[^0-9.]/g, '')">
                          <div class="but">
                              <button class="btn">Set Fee</button>
                          </div>
                          <div class="check-mark-container">
  <div class="check-mark">✔</div>
</div>
                          <div class="Submitted" style="margin-top: 5px; "></div>
                      </div>
                      <div class="form-img">
                          <img src="./icons/printer.png" alt="Printer Icon">
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
   <div id="loginModal" class="modal-history">
      <div class="modal-contentss">
        <span class="close" id="close-js">&times;</span>
        <h2>Login</h2>
        <p>Administrative access is required to view this page. Enter any Username and Password to continue.</p>
        <form id="loginForm">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" >
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" >
          </div>
          <div class="invalid"></div>
          <button type="submit" class="submit">Login</button>
        </form>
      </div>
    </div>
      <div id="logout-modal" class="modals hidden">
      <div class="modal-contents">
        <p>Are you sure you want to log out?</p>
        <div class="modal-buttons">
          <button id="confirm-logout" class="modal-button confirm">Log Out</button>
          <button id="cancel-logout" class="modal-button cancel">Cancel</button>
        </div>
      </div>
    </div>

      <div class="confirm-dialog" style="display:none;">
      <div class="dialog-content">
        <p>
          This operation would reset the existing fee to default. Do you wish to proceed?
        </p>
        <button class="yes-btn">Yes</button>
        <button class="no-btn">No</button></div>  
    </div>

    <div id="spinner-overlay">
  <div class="spinner"></div>
</div>

<div id="dataModalUpload" class="modal-upload">
  <div class="modal-content-upload">
    <span class="close-modal-upload" id="closeModalUploadButton">&times;</span>
    <h2>Add Vehicle Details</h2>
    <form id="vehicleForm">
      <label for="vehicleName">Name:</label>
      <input type="text" id="vehicleName" name="vehicleName" placeholder="Enter name">

      <label for="vehiclePrice">Price:</label>
      <input type="number" id="vehiclePrice" name="vehiclePrice" placeholder="Enter price" required>

      <label for="vehicleImage">Upload Vehicle Image:</label>
      <input type="file" id="vehicleImage" name="vehicleImage" accept="image/*" >

      <label for="receiptNote">Receipt Note:</label>
      <textarea id="receiptNote" maxlength="100" name="receiptNote" placeholder="Enter Footer Note For Receipt" rows="3"></textarea>

      <button type="button" id="saveButton">Save</button>
    </form>
  </div>
</div>

 <div class="modal-links hidden" id="linksModal">
          <div class="modal-content-links">
            <span class="close-modal-link" id="closeModalLinks">&times;</span>
            <div class="links">
              <p class="about about-js">About Ticket</p>
              <p class="about js-all-vehicles-ticket-button">Total Ticket Issued</p>
              <p id="openModalBtn" class="sales-record">Sales Record</p>
              <p  class="about  set-fee">Set Vehicle Fee</p>
              <p  class="about openModalUploadButton"> Add Ticket Button</p>
              <p class="log-out-text log-out-js">Logout</p>
            </div>
          </div>
        </div>


`;


