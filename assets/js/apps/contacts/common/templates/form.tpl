<form>
  <div class="control-group">

    <label for="contact-gender" class="control-label">Gender:</label>
    <select id="contact-gender" name="gender" >
      <option value='-1'>---</option>
      <option <%= gender == '0' ? 'selected="selected"' : '' %> value='0'>Male</option>
      <option <%= gender == '1' ? 'selected="selected"' : '' %> value='1'>Female</option>
    </select>
  </div>

  <div class="control-group">
    <label for="contact-firstName" class="control-label">First name:</label>
    <input id="contact-firstName" name="firstName" type="text" value="<%= firstName %>"/>
  </div>

  <div class="control-group">
    <label for="contact-lastName" class="control-label">Last name:</label>
    <input id="contact-lastName" name="lastName" type="text" value="<%= lastName %>"/>
  </div>
  <div class="control-group">
    <label for="contact-phoneNumber" class="control-label">Phone number:</label>
    <input id="contact-phoneNumber" name="phoneNumber" type="text" value="<%= phoneNumber %>"/>
  </div>
  <button class="btn js-submit">Save</button>
</form>